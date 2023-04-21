import * as React from 'react';
import { TbLoader2 } from 'react-icons/tb';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import clsxm from '@/lib/clsxm';
import data from '@/lib/math/defaultData';

import { graphData } from '@/components/methods/Bisection';
export default function Graph({
  graphData,
  isLoading,
}: {
  graphData: graphData[] | null;
  isLoading: boolean;
}) {
  const [graph, setGraph] = React.useState<graphData[]>([]);
  React.useEffect(() => {
    graphData === null ? setGraph(data) : setGraph(graphData);
  }, [graphData]);

  return (
    <div className={clsxm(isLoading && 'opacity-50', 'relative')}>
      <div className='py-5 px-5 max-[1200px]:hidden'>
        <LineChart
          width={750}
          height={330}
          data={graph}
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
      {isLoading && (
        <div className='absolute top-0 left-0 flex h-full w-full items-center justify-center'>
          <TbLoader2 className='animate-spin text-5xl' />
        </div>
      )}
    </div>
  );
}
