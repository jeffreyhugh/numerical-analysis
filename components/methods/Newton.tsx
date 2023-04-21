import * as React from 'react';
import { toast } from 'react-hot-toast';
import { TbInfoCircle } from 'react-icons/tb';

import { newton, NewtonReturn } from '@/lib/math/newton';

import { graphData, iterationData } from '@/components/methods/Bisection';
import CalculateButton from '@/components/methods/utils/CalculateButton';
import InitGuess from '@/components/methods/utils/InitGuess';
export default function Newton({
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

  function transformData(data: NewtonReturn) {
    const points: { x: number; y: number }[] = [];
    data.output.forEach((dataPoint) => {
      points.push({ x: dataPoint.current, y: dataPoint.fx });
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
    if (functionInput === '') {
      toast.error('Please enter a function');
      return;
    }

    setIsLoading(true);
    handleGraphLoading(true);
    try {
      const res = await newton(functionInput, initialGuess, tolerance);
      const cleanedData = transformData(res);
      handleGraphData(cleanedData);
      handleIterationData({
        iterations: res.output.length,
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
        <InitGuess setInitialGuess={setInitialGuess} />
      </div>
      <CalculateButton
        handleCalculate={handleCalculate}
        isLoading={isLoading}
      />
    </div>
  );
}
