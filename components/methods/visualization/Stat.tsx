import * as React from 'react';
import { TbLoader2 } from 'react-icons/tb';

import { iterationData } from '@/components/methods/Bisection';
export default function Stat({
  iterationData,
  isLoading,
}: {
  iterationData: iterationData;
  isLoading: boolean;
}) {
  return (
    <div className='stats stats-vertical max-w-xs shadow lg:stats-horizontal'>
      <div className='stat'>
        <div className='stat-title'>Iterations</div>
        {isLoading ? (
          <div className='stat-value'>
            <TbLoader2 className='animate-spin' />
          </div>
        ) : (
          <div className='stat-value'>{iterationData.iterations}</div>
        )}
      </div>

      <div className='stat'>
        <div className='stat-title'>Root</div>
        {isLoading ? (
          <div className='stat-value'>
            <TbLoader2 className='animate-spin' />
          </div>
        ) : (
          <div className='stat-value'>{iterationData.root.toPrecision(6)}</div>
        )}
      </div>
    </div>
  );
}
