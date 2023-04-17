import * as React from 'react';
import { InlineMath } from 'react-katex';

import convertToLatex from '@/lib/math/convert_to_latex';
export default function FunctionKatex({
  functionInput,
}: {
  functionInput: string;
}) {
  return (
    <div className='flex w-full max-w-sm flex-col justify-end gap-1'>
      <h2>Evaluating:</h2>
      <div className='flex w-full max-w-sm items-center justify-center rounded-sm border border-neutral text-xl'>
        <div className='flex flex-row py-5'>
          {functionInput == '' ? (
            'No equation entered'
          ) : (
            <InlineMath math={convertToLatex(functionInput)} />
          )}
        </div>
      </div>
      <div className='text-xs'>Not what you wanted? Try using parentheses</div>
    </div>
  );
}
