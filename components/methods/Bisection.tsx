import * as React from 'react';
import { toast } from 'react-hot-toast';
import { TbInfoCircle } from 'react-icons/tb';

import UpperLower from '@/components/methods/utils/UpperLower';
//graph data is x and y or null
export type graphData = {
  x: number;
  y: number;
};

export type iterationData = {
  iterations: number;
  root: number;
};

import clsxm from '@/lib/clsxm';
import { bisection, BisectionReturn } from '@/lib/math/bisection';
export default function Bisection({
  functionInput,
  handleGraphLoading,
  handleGraphData,
  handleIterationData,
  graphLoading,
  tolerance,
}: {
  functionInput: string;
  handleGraphLoading: (loading: boolean) => void;
  handleGraphData: (data: graphData[] | null) => void;
  handleIterationData: (data: iterationData) => void;
  graphLoading: boolean;
  tolerance: number;
}) {
  const [lowerBound, setLowerBound] = React.useState(0);
  const [upperBound, setUpperBound] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  function transformData(data: BisectionReturn | null) {
    const points: { x: number; y: number }[] = [];
    data?.output.forEach((dataPoint) => {
      points.push(
        { x: dataPoint.a, y: dataPoint.f_a },
        { x: dataPoint.b, y: dataPoint.f_b },
        { x: dataPoint.c, y: dataPoint.f_c }
      );
    });
    return points;
  }
  async function handleCalculate() {
    if (graphLoading) {
      toast.error('Another graph is still loading');
      return;
    }

    if (isNaN(tolerance)) {
      toast.error('Please enter a valid tolerance');
      return;
    }

    if (lowerBound >= upperBound) {
      toast.error('Lower-bound must be less than upper-bound');
      return;
    }
    if (functionInput === '') {
      toast.error('Please enter a function');
      return;
    }
    if (isNaN(lowerBound) || isNaN(upperBound)) {
      toast.error('Please enter valid parameters');
      return;
    }
    setIsLoading(true);
    handleGraphLoading(true);
    try {
      const res = await bisection(
        functionInput,
        lowerBound,
        upperBound,
        tolerance
      );
      const cleanedData = transformData(res);
      handleGraphData(cleanedData);
      handleIterationData({
        iterations: res.output.length,
        root: res.output[res?.output.length - 1].c,
      });
    } catch (err) {
      toast.error(err as string);
    }
    setIsLoading(false);
    handleGraphLoading(false);
  }

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
        <UpperLower
          setLowerBound={setLowerBound}
          setUpperBound={setUpperBound}
        />
      </div>
      <button
        className={clsxm('btn-primary btn', isLoading && 'loading')}
        disabled={isLoading}
        onClick={handleCalculate}
      >
        Calculate
      </button>
    </div>
  );
}
