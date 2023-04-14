/* eslint-disable no-console */
import * as React from 'react';
import { toast } from 'react-hot-toast';
import { InlineMath } from 'react-katex';

import clsxm from '@/lib/clsxm';
import { bisection } from '@/lib/math/bisection';
import { fpi } from '@/lib/math/fpi';
import { wa_derivative } from '@/lib/math/wa_derivative';
import { wa_eval } from '@/lib/math/wa_eval';

import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function Page() {
  const [isLoading, setIsLoading] = React.useState(false);

  const bisection_f = 'x^3 - 2*x - 2';
  const bisection_a = 1;
  const bisection_b = 2;
  const bisection_tolerance = 0.5 * 10 ** -6;

  const calc_bisection = () => {
    setIsLoading(true);
    bisection(bisection_f, bisection_a, bisection_b, bisection_tolerance)
      .then((res) => console.log(res))
      .catch((e) => console.error(e))
      .finally(() => {
        setIsLoading(false);
        toast.success('Check the console');
      });
  };

  // const fpi_f = '\\frac{x^3 - 2}{2}';  // DOES NOT CONVERGE
  const fpi_f = '\\sqrt[3]{2x + 2}';
  const fpi_x = 1.7;
  const fpi_tolerance = 0.5 * 10 ** -8;

  const calc_fpi = () => {
    setIsLoading(true);
    fpi(fpi_f, fpi_x, fpi_tolerance)
      .then((res) => console.log(res))
      .catch((e) => console.error(e))
      .finally(() => {
        setIsLoading(false);
        toast.success('Check the console');
      });
  };

  const derivative_f = 'ln(x)';
  const derivative_values = [0, 1, 3];

  const test_derivative = () => {
    setIsLoading(true);
    wa_derivative(derivative_f, 1)
      .then((res) => wa_eval(res, derivative_values))
      .then((res) => console.log(res))
      .catch((e) => console.error(e))
      .finally(() => {
        setIsLoading(false);
        toast.success('Check the console');
      });
  };

  return (
    <Layout>
      <Seo templateTitle='Playground' />

      <main className='flex flex-grow'>
        <section className='flex flex-grow'>
          <div className='layout min-h-c'>
            <Breadcrumbs />
            <h1 className='text-4xl font-bold'>Yuh</h1>
            <div className='mt-6'>
              <div className='flex gap-2'>
                <div>
                  <div>
                    <InlineMath math={bisection_f} />
                  </div>
                  <div>a = {bisection_a}</div>
                  <div>b = {bisection_b}</div>
                  <div>tolerance = {bisection_tolerance}</div>
                  <button
                    className={clsxm('btn mt-4', isLoading && 'loading')}
                    disabled={isLoading}
                    type='button'
                    onClick={calc_bisection}
                  >
                    Bisection Method
                  </button>
                </div>
                <div className='divider divider-horizontal' />
                <div>
                  <div>
                    <InlineMath math={fpi_f} />
                  </div>
                  <div>x = {fpi_x}</div>
                  <div>tolerance = {fpi_tolerance}</div>
                  <button
                    className={clsxm('btn mt-4', isLoading && 'loading')}
                    disabled={isLoading}
                    type='button'
                    onClick={calc_fpi}
                  >
                    Fixed Point Iteration
                  </button>
                </div>
                <div className='divider divider-horizontal' />
                <div>
                  <div>
                    <InlineMath math={derivative_f} />
                  </div>
                  <div>values = {derivative_values}</div>
                  <button
                    className={clsxm('btn mt-4', isLoading && 'loading')}
                    disabled={isLoading}
                    type='button'
                    onClick={test_derivative}
                  >
                    Test Derivative
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
