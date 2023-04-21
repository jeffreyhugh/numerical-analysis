import * as React from 'react';

import clsxm from '@/lib/clsxm';
export default function CalculateButton({
  isLoading,
  handleCalculate,
}: {
  isLoading: boolean;
  handleCalculate: () => void;
}) {
  return (
    <button
      className={clsxm('btn-primary btn', isLoading && 'loading')}
      disabled={isLoading}
      onClick={handleCalculate}
    >
      Calculate
    </button>
  );
}
