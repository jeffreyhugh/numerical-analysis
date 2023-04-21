import * as React from 'react';
import { TbSettings } from 'react-icons/tb';
export default function Settings({
  handleTolerance,
}: {
  handleTolerance: (tolerance: number) => void;
}) {
  return (
    <div className='dropdown'>
      <label tabIndex={0} className='btn-primary btn'>
        <TbSettings />
      </label>
      <ul
        tabIndex={0}
        className='dropdown-content rounded-box w-52 bg-base-100 p-2 shadow'
      >
        <li>
          <div className='form-control w-full max-w-xs'>
            <label className='label'>
              <span className='label-text'>Tolerance</span>
            </label>
            <input
              type='text'
              defaultValue={0.0001}
              className='input-bordered input w-full max-w-xs'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleTolerance(parseFloat(e.target.value))
              }
            />
          </div>
        </li>
      </ul>
    </div>
  );
}
