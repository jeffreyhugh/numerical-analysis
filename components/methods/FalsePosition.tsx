import * as React from 'react';

export default function FalsePosition() {
  return (
    <div className='flex flex-col gap-2'>
      <p className='text-sm'>
        The False Position Method (Regula Falsi) combines aspects of both the
        Bisection Method and the Secant Method. The method works by
        approximating the root of a function using the point where the secant
        line between two points intersects the x-axis. The False Position Method
        maintains a bracketing interval ensuring that the root is always within
        the interval.
      </p>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-row gap-1'>
          <h4 className='h5'>Required Parameters</h4>
          <div className='flex items-center justify-center'>
            <div
              className='tooltip tooltip-bottom'
              data-tip='[a, b] must satisfy IVT for f(x); Convergence depends on the initial guesses and the function'
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
            placeholder='Lower-bound (a)'
            className='input-bordered input input-md w-[75%] max-w-xs'
          />
          <input
            type='text'
            placeholder='Upper-bound (b)'
            className='input-bordered input input-md w-[75%] max-w-xs'
          />
        </div>
      </div>
    </div>
  );
}
