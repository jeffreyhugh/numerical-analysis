import * as React from 'react';
import { TbInfoCircle } from 'react-icons/tb';

export default function FixedPoint() {
  return (
    <div className='flex flex-col gap-2'>
      <p className='text-sm'>
        An iterative method used for finding the fixed point of a function, FPI
        is equivalent to finding the root of an equation. The method relies on
        rewriting the given function as an equivalent fixed-point problem and
        iteratively refines the approximation to the fixed point.
      </p>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-row gap-1'>
          <h4 className='h5'>Required Parameters</h4>
          <div className='flex items-center justify-center'>
            <div
              className='tooltip tooltip-bottom'
              data-tip='Convergence depends on the initial guess and the function'
            >
              <TbInfoCircle />
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
