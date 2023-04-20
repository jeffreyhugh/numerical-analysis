import * as React from 'react';

export default function UpperLower({
  setLowerBound,
  setUpperBound,
}: {
  setLowerBound: (lowerBound: number) => void;
  setUpperBound: (upperBound: number) => void;
}) {
  return (
    <div className='flex flex-col gap-2'>
      <input
        type='text'
        placeholder='Lower-bound (a)'
        className='input-bordered input input-md w-[75%] max-w-xs'
        onChange={(e) => setLowerBound(parseFloat(e.target.value))}
      />
      <input
        type='text'
        placeholder='Upper-bound (b)'
        className='input-bordered input input-md w-[75%] max-w-xs'
        onChange={(e) => setUpperBound(parseFloat(e.target.value))}
      />
    </div>
  );
}
