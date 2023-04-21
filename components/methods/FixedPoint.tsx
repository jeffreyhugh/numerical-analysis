import Link from 'next/link';
import * as React from 'react';
import { toast } from 'react-hot-toast';
import { TbInfoCircle } from 'react-icons/tb';

import { fpi, FPIReturn } from '@/lib/math/fpi';

import { graphData, iterationData } from '@/components/methods/Bisection';
import CalculateButton from '@/components/methods/utils/CalculateButton';
import InitGuess from '@/components/methods/utils/InitGuess';
export default function FixedPoint({
  functionInput,
  tolerance,
  handleGraphLoading,
  handleGraphData,
  handleIterationData,
  graphLoading,
}: {
  functionInput: string;
  tolerance: number;
  handleGraphLoading: (loading: boolean) => void;
  handleGraphData: (data: graphData[] | null) => void;
  handleIterationData: (data: iterationData) => void;
  graphLoading: boolean;
}) {
  const [initialGuess, setInitialGuess] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  function transformData(data: FPIReturn) {
    const points: { x: number; y: number }[] = [];
    data.output.forEach((dataPoint) => {
      points.push({ x: dataPoint.n, y: dataPoint.current });
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
    if (isNaN(initialGuess)) {
      toast.error('Please enter a valid initial guess');
    }
    if (functionInput === '') {
      toast.error('Please enter a valid function');
    }
    setIsLoading(true);
    handleGraphLoading(true);
    try {
      const res = await fpi(functionInput, initialGuess, tolerance);
      const cleanedData = transformData(res);
      handleGraphData(cleanedData);
      handleIterationData({
        iterations: res.output.length - 1,
        root: res.output[res.output.length - 1].current,
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
        An iterative method used for finding the fixed point of a function, FPI
        is equivalent to finding the root of an equation. The method relies on
        rewriting the given function as an equivalent fixed-point problem and
        iteratively refines the approximation to the fixed point.{' '}
        <Link className='link' href='/methods/fixed-point'>
          learn more
        </Link>
      </div>
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
        <InitGuess setInitialGuess={setInitialGuess} />
      </div>
      <CalculateButton
        handleCalculate={handleCalculate}
        isLoading={isLoading}
      />
    </div>
  );
}
