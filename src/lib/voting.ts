/**
 * Audience voting transport.
 *
 * Votes are relayed through a public pub/sub service (ntfy.sh) so that a static
 * deployment such as GitHub Pages can still collect votes from phones without a
 * backend of its own. The presenter subscribes to the room topic and tallies the
 * votes in the browser.
 */

const RELAY_BASE = 'https://ntfy.sh';
const TOPIC_PREFIX = 'arttheory-vote-';
const STORAGE_ROOM = 'arttheory.room';
const STORAGE_CLIENT = 'arttheory.client';

/** Payload a phone sends when it casts a vote. */
export interface VotePayload {
  /** Message kind; only `v` (vote) is used today. */
  t: 'v';
  /** Question index, matching `quizQuestions`. */
  q: number;
  /** Option index: 0 = 是, 1 = 不是, 2 = 不确定. */
  o: number;
  /** Stable per-device id so a student can change their answer. */
  c: string;
}

export type VoteStatus = 'connecting' | 'live' | 'error';

// Ambiguous characters (l/1/i/o/0) are omitted so room codes are easy to read aloud.
const ROOM_ALPHABET = 'abcdefghjkmnpqrstuvwxyz23456789';

export function createRoomCode(length = 6): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  let out = '';
  for (let i = 0; i < length; i += 1) {
    out += ROOM_ALPHABET[bytes[i] % ROOM_ALPHABET.length];
  }
  return out;
}

export function normalizeRoom(room: string): string {
  return room.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 32);
}

function topicFor(room: string): string {
  return TOPIC_PREFIX + normalizeRoom(room);
}

/** Current room code, creating and persisting one on first use. */
export function getRoom(): string {
  try {
    const saved = localStorage.getItem(STORAGE_ROOM);
    if (saved && normalizeRoom(saved)) return normalizeRoom(saved);
  } catch {
    // localStorage can be unavailable (private mode); fall through to a fresh code.
  }
  return startNewRoom();
}

/** Rotate to a fresh room so previously collected votes are abandoned. */
export function startNewRoom(): string {
  const room = createRoomCode();
  try {
    localStorage.setItem(STORAGE_ROOM, room);
  } catch {
    // Persisting is best-effort; the returned code still works for this session.
  }
  return room;
}

/** Stable per-device identifier so repeated votes from one phone replace each other. */
export function getClientId(): string {
  try {
    const saved = localStorage.getItem(STORAGE_CLIENT);
    if (saved) return saved;
  } catch {
    // Ignore and generate a temporary id below.
  }
  const id = createRoomCode(12);
  try {
    localStorage.setItem(STORAGE_CLIENT, id);
  } catch {
    // Non-persistent id is still unique for this page load.
  }
  return id;
}

/** Directory the app is served from, e.g. `/` or `/art-theory-demo/`. */
export function basePath(): string {
  const path = window.location.pathname;
  return path.endsWith('/') ? path : path.slice(0, path.lastIndexOf('/') + 1);
}

/** URL encoded into the QR code that students scan. */
export function joinUrl(room: string, questionIndex: number): string {
  const url = new URL(window.location.origin + basePath());
  url.searchParams.set('vote', normalizeRoom(room));
  url.searchParams.set('q', String(questionIndex));
  return url.toString();
}

/** Send one vote to the room. */
export async function publishVote(room: string, questionIndex: number, option: number): Promise<void> {
  const payload: VotePayload = {
    t: 'v',
    q: questionIndex,
    o: option,
    c: getClientId(),
  };
  const response = await fetch(`${RELAY_BASE}/${topicFor(room)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`vote failed with status ${response.status}`);
  }
}

/**
 * Subscribe to every vote cast in the room.
 *
 * The relay is polled rather than streamed. Streaming (`/sse`) is blocked by common
 * ad-blocker filter lists, and polling also re-reads votes that were cast while the
 * presenter was still connecting, so nothing is lost. Duplicate frames are dropped
 * by message id.
 *
 * Returns an unsubscribe function.
 */
export function subscribeVotes(
  room: string,
  onVote: (vote: VotePayload) => void,
  onStatus?: (status: VoteStatus, detail?: string) => void,
  intervalMs = 2500,
): () => void {
  const seen = new Set<string>();
  onStatus?.('connecting');

  let stopped = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let totalAccepted = 0;
  let totalParseFailures = 0;
  let polls = 0;

  const poll = async () => {
    try {
      const response = await fetch(`${RELAY_BASE}/${topicFor(room)}/json?poll=1&since=12h`);
      if (!response.ok) throw new Error(`relay responded ${response.status}`);
      const body = await response.text();
      polls += 1;
      let lines = 0;
      let frames = 0;

      body.split('\n').forEach((line) => {
        if (!line.trim()) return;
        lines += 1;
        try {
          const envelope = JSON.parse(line) as { id?: string; event?: string; message?: string };
          const id = envelope.id ?? line;
          if (seen.has(id)) return;
          seen.add(id);
          if (envelope.event !== 'message' || typeof envelope.message !== 'string') return;
          frames += 1;
          const payload = JSON.parse(envelope.message) as VotePayload;
          if (payload?.t === 'v' && typeof payload.q === 'number' && typeof payload.o === 'number') {
            totalAccepted += 1;
            onVote(payload);
          }
        } catch {
          totalParseFailures += 1;
        }
      });

      const detail = `第${polls}次 字节${body.length} 行${lines} 帧${frames} 累计投票${totalAccepted} 解析失败${totalParseFailures}`;
      console.log('[vote-poll]', detail, body.slice(0, 200));
      onStatus?.('live', detail);
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      console.warn('[vote-poll-error]', detail);
      onStatus?.('error', detail);
    } finally {
      if (!stopped) {
        timer = setTimeout(poll, intervalMs);
      }
    }
  };

  void poll();

  return () => {
    stopped = true;
    if (timer) clearTimeout(timer);
  };
}
