import Link from 'next/link';
import * as React from 'react';
import { toast } from 'react-hot-toast';
import { TbInfoCircle } from 'react-icons/tb';

import { bisection, BisectionReturn } from '@/lib/math/bisection';

import CalculateButton from '@/components/methods/utils/CalculateButton';
import UpperLower from '@/components/methods/utils/UpperLower';

export type graphData = {
  x: number;
  y: number;
};

export type iterationData = {
  iterations: number;
  root: number;
};

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
      points.push({
        x: parseFloat(dataPoint.c.toPrecision(6)),
        y: parseFloat(dataPoint.f_c.toPrecision(6)),
      });
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
      <div className='text-sm'>
        A simple, robust, and iterative method for root finding. the Bisection
        Method relies on the Intermediate Value Theorem for approximating a
        functions root.{' '}
        <Link className='link' href='/methods/bisection'>
          learn more
        </Link>
      </div>
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
      <CalculateButton
        handleCalculate={handleCalculate}
        isLoading={isLoading}
      />
    </div>
  );
}
