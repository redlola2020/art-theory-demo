import { useState, useEffect } from 'react';

// Custom hook to manage internal steps for a page, intercepting chapter-next-step navigation
export function useStep(maxStep: number) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const handleNextStep = (e: Event) => {
      if (step < maxStep) {
        setStep(s => s + 1);
        e.preventDefault(); // Stop global advance
      }
    };

    window.addEventListener('chapter-next-step', handleNextStep);

    return () => {
      window.removeEventListener('chapter-next-step', handleNextStep);
    };
  }, [step, maxStep]);

  return step;
}
