import * as React from 'react';
import { TbInfoCircle } from 'react-icons/tb';

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
