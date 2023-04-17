import * as React from 'react';

export default function Newton() {
  return (
    <div className='flex flex-col gap-2'>
      <p className='text-sm'>
        Newtons Method (Newton-Raphson Method) is an iterative root-finding
        technique that uses linear approximation and function derivatives to
        quickly converge to the root of a function. It is a widely-used and
        powerful method due to its fast convergence rate when an initial guess
        is close to the actual root.
      </p>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-row gap-1'>
          <h4 className='h5'>Required Parameters</h4>
          <div className='flex items-center justify-center'>
            <div
              className='tooltip tooltip-bottom'
              data-tip='Convergence depends on the initial guess and the function'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-3.5 w-3.5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <input
            type='text'
            placeholder='Initial guess (x0)'
            className='input-bordered input input-md w-[75%] max-w-xs'
          />
        </div>
      </div>
    </div>
  );
}
