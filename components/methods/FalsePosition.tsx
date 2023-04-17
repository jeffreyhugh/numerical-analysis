import * as React from 'react';
import { TbInfoCircle } from 'react-icons/tb';

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
              <TbInfoCircle />
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
