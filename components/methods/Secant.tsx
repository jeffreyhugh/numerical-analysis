import * as React from 'react';
import { TbInfoCircle } from 'react-icons/tb';

export default function Secant() {
  return (
    <div className='flex flex-col gap-2'>
      <p className='text-sm'>
        The Secant Method approximates the root of a function by drawing a
        secant line between two points and finding their intersection with the
        x-axis. The method is similar to Newtons Method but does not require the
        calculation of derivatives, instead using two initial guesses.
      </p>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-row gap-1'>
          <h4 className='h5'>Required Parameters</h4>
          <div className='flex items-center justify-center'>
            <div
              className='tooltip tooltip-bottom'
              data-tip='Convergence depends on the initial guesses and the function'
            >
              <TbInfoCircle />
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <input
            type='text'
            placeholder='First initial guess (x0)'
            className='input-bordered input input-md w-[75%] max-w-xs'
          />
          <input
            type='text'
            placeholder='Second initial guess (x1)'
            className='input-bordered input input-md w-[75%] max-w-xs'
          />
        </div>
      </div>
    </div>
  );
}
