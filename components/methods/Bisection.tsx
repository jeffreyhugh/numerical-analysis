import * as React from 'react';
import { TbInfoCircle } from 'react-icons/tb';

export default function Bisection() {
  return (
    <div className='flex flex-col gap-2'>
      <p className='text-sm'>
        A simple, robust, and iterative method for root finding. the Bisection
        Method relies on the Intermediate Value Theorem for approximating a
        functions root.
      </p>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-row gap-1'>
          <h4 className='h5'>Required Parameters</h4>
          <div className='flex items-center justify-center'>
            <div
              className='tooltip tooltip-bottom'
              data-tip='[a, b] must satisfy IVT for f(x)'
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
