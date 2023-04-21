import * as React from 'react';

export default function InitGuess({
  setInitialGuess,
}: {
  setInitialGuess: (initialGuess: number) => void;
}) {
  return (
    <div className='flex flex-col gap-2'>
      <input
        type='text'
        placeholder='Initial guess (x0)'
        className='input-bordered input input-md w-[75%] max-w-xs'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInitialGuess(parseFloat(e.target.value))
        }
      />
    </div>
  );
}
