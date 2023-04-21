import * as React from 'react';

import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import Layout from '@/components/layout/Layout';
import Bisection, {
  graphData,
  iterationData,
} from '@/components/methods/Bisection';
import FalsePosition from '@/components/methods/FalsePosition';
import FixedPoint from '@/components/methods/FixedPoint';
import Newton from '@/components/methods/Newton';
import Secant from '@/components/methods/Secant';
import FunctionInput from '@/components/methods/utils/FunctionInput';
import SelectMethod from '@/components/methods/utils/SelectMethod';
import Settings from '@/components/methods/utils/Settings';
import FunctionKatex from '@/components/methods/visualization/FunctionKatex';
import Graph from '@/components/methods/visualization/Graph';
import MethodModal from '@/components/methods/visualization/MethodModal';
import Stat from '@/components/methods/visualization/Stat';
import Seo from '@/components/Seo';

export default function Page() {
  const [selectedMethod, setSelectedMethod] = React.useState('bisection');
  const [functionInput, setFunctionInput] = React.useState('3*sin(x) - x^3');
  const [graphData, setGraphData] = React.useState<graphData[] | null>(null);
  const [graphLoading, setGraphLoading] = React.useState(false);
  const [tolerance, setTolerance] = React.useState(0.0001);
  const [iterationData, setIterationData] =
    React.useState<iterationData | null>(null);

  function handleTolerance(tolerance: number) {
    setTolerance(tolerance);
  }

  function handleIterationData(data: iterationData) {
    setIterationData(data);
  }

  function handleGraphData(data: graphData[] | null) {
    setGraphData(data);
  }

  function handleGraphLoading(loading: boolean) {
    setGraphLoading(loading);
  }

  function handleFunctionInput(e: React.ChangeEvent<HTMLInputElement>) {
    setFunctionInput(e.target.value);
  }

  function handleMethodSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedMethod(e.target.value);
  }

  return (
    <Layout>
      <Seo templateTitle='' />
      <main className='flex flex-grow'>
        <section className='flex flex-grow'>
          <div className='layout min-h-c'>
            <Breadcrumbs />
            <MethodModal />
            <div className='flex flex-col items-center justify-between gap-5 md:flex-row'>
              <div className='flex w-full max-w-xs flex-col gap-5'>
                <FunctionInput
                  functionInput={functionInput}
                  handleFunctionInput={handleFunctionInput}
                />
                <div className='w-fill flex gap-[1.85rem]'>
                  <SelectMethod
                    selectedMethod={selectedMethod}
                    handleMethodSelect={handleMethodSelect}
                  />
                  <div className='flex items-center'>
                    <Settings handleTolerance={handleTolerance} />
                  </div>
                </div>
                {selectedMethod === 'bisection' && (
                  <Bisection
                    tolerance={tolerance}
                    functionInput={functionInput}
                    handleGraphData={handleGraphData}
                    handleGraphLoading={handleGraphLoading}
                    handleIterationData={handleIterationData}
                    graphLoading={graphLoading}
                  />
                )}
                {selectedMethod === 'fixed-point' && (
                  <FixedPoint
                    tolerance={tolerance}
                    functionInput={functionInput}
                    handleGraphData={handleGraphData}
                    handleGraphLoading={handleGraphLoading}
                    handleIterationData={handleIterationData}
                    graphLoading={graphLoading}
                  />
                )}
                {selectedMethod === 'newton' && (
                  <Newton
                    tolerance={tolerance}
                    functionInput={functionInput}
                    handleGraphData={handleGraphData}
                    handleGraphLoading={handleGraphLoading}
                    handleIterationData={handleIterationData}
                    graphLoading={graphLoading}
                  />
                )}
                {selectedMethod === 'secant' && (
                  <Secant
                    tolerance={tolerance}
                    functionInput={functionInput}
                    handleGraphData={handleGraphData}
                    handleGraphLoading={handleGraphLoading}
                    handleIterationData={handleIterationData}
                    graphLoading={graphLoading}
                  />
                )}
                {selectedMethod === 'false-position' && (
                  <FalsePosition
                    tolerance={tolerance}
                    functionInput={functionInput}
                    handleGraphData={handleGraphData}
                    handleGraphLoading={handleGraphLoading}
                    handleIterationData={handleIterationData}
                    graphLoading={graphLoading}
                  />
                )}
              </div>
              <div className='flex w-full flex-col items-center justify-center gap-5'>
                <div className='flex w-full justify-between px-10 max-[1200px]:flex-col max-[1200px]:items-center max-[1200px]:gap-10 '>
                  <FunctionKatex functionInput={functionInput} />
                  {iterationData && (
                    <Stat
                      isLoading={graphLoading}
                      iterationData={iterationData}
                    />
                  )}
                </div>
                <Graph graphData={graphData} isLoading={graphLoading} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
