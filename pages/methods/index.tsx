import * as React from 'react';

import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import Layout from '@/components/layout/Layout';
import Bisection from '@/components/methods/Bisection';
import FalsePosition from '@/components/methods/FalsePosition';
import FixedPoint from '@/components/methods/FixedPoint';
import Newton from '@/components/methods/Newton';
import Secant from '@/components/methods/Secant';
import FunctionKatex from '@/components/methods/visualization/FunctionKatex';
import Graph from '@/components/methods/visualization/Graph';
import MethodModal from '@/components/methods/visualization/MethodModal';
import Seo from '@/components/Seo';

export default function Page() {
  const [selectedMethod, setSelectedMethod] = React.useState('bisection');
  const [functionInput, setFunctionInput] = React.useState('3*sin(x) - x^3');

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
            <div className='flex flex-col justify-between gap-5 md:flex-row'>
              <div className='flex w-full max-w-xs flex-col gap-5'>
                <div className='form-control w-full max-w-xs'>
                  <label className='label'>
                    <span className='label-text'>Enter an equation</span>
                  </label>
                  <input
                    type='text'
                    value={functionInput}
                    onChange={handleFunctionInput}
                    className='w-fill input-bordered input max-w-xs'
                  />
                </div>
                <div className='form control w-fill flex max-w-xs flex-col'>
                  <select
                    className='select-bordered select'
                    value={selectedMethod}
                    onChange={handleMethodSelect}
                  >
                    <option value='bisection'>Bisection</option>
                    <option value='fixed-point'>Fixed-Point Iteration</option>
                    <option value='newton'>Newton</option>
                    <option value='secant'>Secant</option>
                    <option value='false-position'>False Position</option>
                  </select>
                </div>
                {selectedMethod === 'bisection' && <Bisection />}
                {selectedMethod === 'fixed-point' && <FixedPoint />}
                {selectedMethod === 'newton' && <Newton />}
                {selectedMethod === 'secant' && <Secant />}
                {selectedMethod === 'false-position' && <FalsePosition />}
              </div>
              <div className='flex w-full flex-col items-center justify-center gap-5'>
                <FunctionKatex functionInput={functionInput} />
                <Graph />
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
