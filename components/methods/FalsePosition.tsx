import * as React from 'react';
import { toast } from 'react-hot-toast';
import { TbInfoCircle } from 'react-icons/tb';

import { falsePosition, FalsePositionReturn } from '@/lib/math/falsePosition';

import { graphData, iterationData } from '@/components/methods/Bisection';
import CalculateButton from '@/components/methods/utils/CalculateButton';
import UpperLower from '@/components/methods/utils/UpperLower';
export default function FalsePosition({
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

  function transformData(data: FalsePositionReturn) {
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
      const res = await falsePosition(
        functionInput,
        lowerBound,
        upperBound,
        tolerance
      );
      const cleanedData = transformData(res);
      handleGraphData(cleanedData);
      handleIterationData({
        iterations: res.output.length,
        root: res.output[res.output.length - 1].c,
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
        The False Position Method (Regula Falsi) works by approximating the root
        of a function using the point where the secant line between two points
        intersects the x-axis. The False Position Method maintains a bracketing
        interval ensuring that the root is always within the interval.
      </p>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-row gap-1'>
          <h4 className='h5'>Required Parameters</h4>
          <div className='flex items-center justify-center'>
            <div
              className='tooltip tooltip-bottom'
              data-tip='[a, b] must satisfy IVT for f(x); Convergence depends on the initial guesses and the function'
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
        isLoading={isLoading}
        handleCalculate={handleCalculate}
      />
    </div>
  );
}
