import * as React from 'react';

import { iterationData } from '@/components/methods/Bisection';

export default function Stat({
  iterationData,
}: {
  iterationData: iterationData;
}) {
  return (
    <div className='stats stats-vertical shadow lg:stats-horizontal'>
      <div className='stat'>
        <div className='stat-title'>Iterations</div>
        <div className='stat-value'>{iterationData.iterations}</div>
      </div>

      <div className='stat'>
        <div className='stat-title'>Root</div>
        <div className='stat-value'>{iterationData.root.toPrecision(6)}</div>
      </div>
    </div>
  );
}
