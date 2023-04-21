import Link from 'next/link';
import * as React from 'react';
import { toast } from 'react-hot-toast';
import { TbInfoCircle } from 'react-icons/tb';

import { secant, SecantReturn } from '@/lib/math/secant';

import { graphData, iterationData } from '@/components/methods/Bisection';
import CalculateButton from '@/components/methods/utils/CalculateButton';
export default function Secant({
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
  const [isLoading, setIsLoading] = React.useState(false);
  const [firstGuess, setFirstGuess] = React.useState(0);
  const [secondGuess, setSecondGuess] = React.useState(0);

  function transformData(data: SecantReturn) {
    const points: { x: number; y: number }[] = [];
    data?.output.forEach((dataPoint) => {
      points.push({
        x: parseFloat(dataPoint.middle.toPrecision(6)),
        y: parseFloat(dataPoint.f_middle.toPrecision(6)),
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
    if (firstGuess === secondGuess) {
      toast.error('Initial guesses must be different');
      return;
    }
    if (functionInput === '') {
      toast.error('Please enter a function');
      return;
    }
    if (isNaN(firstGuess) || isNaN(secondGuess)) {
      toast.error('Please enter valid parameters');
      return;
    }
    setIsLoading(true);
    handleGraphLoading(true);
    try {
      const res = await secant(
        functionInput,
        firstGuess,
        secondGuess,
        tolerance
      );
      const cleanedData = transformData(res);
      handleGraphData(cleanedData);
      handleIterationData({
        iterations: res.output.length,
        root: res.output[res.output.length - 1].middle,
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
        The Secant Method approximates the root of a function by drawing a
        secant line between two points and finding their intersection with the
        x-axis. The method is similar to Newtons Method but does not require the
        calculation of derivatives, instead using two initial guesses.{' '}
        <Link className='link' href='/methods/false-position'>
          learn more
        </Link>
      </div>
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
            onChange={(e) => {
              setFirstGuess(parseFloat(e.target.value));
            }}
          />
          <input
            type='text'
            placeholder='Second initial guess (x1)'
            className='input-bordered input input-md w-[75%] max-w-xs'
            onChange={(e) => {
              setSecondGuess(parseFloat(e.target.value));
            }}
          />
        </div>
      </div>
      <CalculateButton
        handleCalculate={handleCalculate}
        isLoading={isLoading}
      />
    </div>
  );
}
