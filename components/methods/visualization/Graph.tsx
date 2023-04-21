import * as React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { graphData } from '@/components/methods/Bisection';

const data = [
  {
    x: 0,
    y: 1,
  },
  {
    x: 1,
    y: 1,
  },
];

export default function Graph({
  graphData,
}: {
  graphData: graphData[] | null;
}) {
  return (
    <div className='py-5 px-5 max-[1200px]:hidden'>
      <LineChart
        width={750}
        height={330}
        data={graphData === null ? data : graphData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='x' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type='monotone'
          dataKey='y'
          stroke='#8884d8'
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
}
