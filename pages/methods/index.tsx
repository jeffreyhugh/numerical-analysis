import * as React from 'react';

import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import Layout from '@/components/layout/Layout';
import FunctionKatex from '@/components/methods/FunctionKatex';
import MethodModal from '@/components/methods/modal';
import Seo from '@/components/Seo';

export default function Page() {
  const [functionInput, setFunctionInput] = React.useState('3*sin(x) - x^3');
  function handleFunctionInput(e: React.ChangeEvent<HTMLInputElement>) {
    setFunctionInput(e.target.value);
  }

  return (
    <Layout>
      <Seo templateTitle='' />

      <main className='flex flex-grow'>
        <section className='flex flex-grow'>
          <div className='layout min-h-c'>
            <Breadcrumbs />
            <MethodModal />
            <div className='flex flex-col gap-5'>
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
              <FunctionKatex functionInput={functionInput} />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
