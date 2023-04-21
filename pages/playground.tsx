/* eslint-disable no-console */
import * as React from 'react';
import { toast } from 'react-hot-toast';
import { InlineMath } from 'react-katex';

import clsxm from '@/lib/clsxm';
import { bisection } from '@/lib/math/bisection';
import { falsePosition } from '@/lib/math/falsePosition';
import { fpi } from '@/lib/math/fpi';
import { fpi2 } from '@/lib/math/fpi2';
import { newton } from '@/lib/math/newton';
import { secant } from '@/lib/math/secant';
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

  const newton_f = 'e^x + sin(x) - 4';
  const newton_x0 = 1;
  const newton_tolerance = 0.5 * 10 ** -6;

  const calc_newton = () => {
    setIsLoading(true);
    newton(newton_f, newton_x0, newton_tolerance)
      .then((res) => console.log(res))
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  };

  const secant_f = 'x^3 - 2x - 2';
  const secant_x0 = 1;
  const secant_x1 = 2;
  const secant_tolerance = 0.5 * 10 ** -6;

  const calc_secant = () => {
    setIsLoading(true);
    secant(secant_f, secant_x0, secant_x1, secant_tolerance)
      .then((res) => console.log(res))
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  };

  const fp_f = 'x^3 - 2x - 2';
  const fp_a = 1;
  const fp_b = 2;
  const fp_tolerance = 0.5 * 10 ** -6;

  const calc_fp = () => {
    setIsLoading(true);
    falsePosition(fp_f, fp_a, fp_b, fp_tolerance)
      .then((res) => console.log(res))
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  };

  const fpi2_f = 'x^3 - 2x - 2';
  const fpi2_g = '\\sqrt[3]{2x+2}';
  const fpi2_x = 0.5;
  const fpi2_tolerance = 0.5 * 10 ** -6;

  const calc_fpi2 = () => {
    setIsLoading(true);
    fpi2(fpi2_f, fpi2_g, fpi2_x, fpi2_tolerance)
      .then((res) => console.log(res))
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
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
              <div className='flex flex-wrap gap-6'>
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

                <div>
                  <div>
                    <InlineMath math={fpi2_f} />
                  </div>
                  <div>
                    <InlineMath math={fpi2_g} />
                  </div>
                  <div>x = {fpi2_x}</div>
                  <div>tolerance = {fpi2_tolerance}</div>
                  <button
                    className={clsxm('btn mt-4', isLoading && 'loading')}
                    disabled={isLoading}
                    type='button'
                    onClick={calc_fpi2}
                  >
                    Fixed Point Iteration 2
                  </button>
                </div>

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

                <div>
                  <div>
                    <InlineMath math={newton_f} />
                  </div>
                  <div>x0 = {newton_x0}</div>
                  <div>tolerance = {newton_tolerance}</div>
                  <button
                    className={clsxm('btn mt-4', isLoading && 'loading')}
                    disabled={isLoading}
                    type='button'
                    onClick={calc_newton}
                  >
                    Newton Iteration
                  </button>
                </div>

                <div>
                  <div>
                    <InlineMath math={secant_f} />
                  </div>
                  <div>x0 = {secant_x0}</div>
                  <div>x1 = {secant_x1}</div>
                  <div>tolerance = {secant_tolerance}</div>
                  <button
                    className={clsxm('btn mt-4', isLoading && 'loading')}
                    disabled={isLoading}
                    type='button'
                    onClick={calc_secant}
                  >
                    Secant Method
                  </button>
                </div>

                <div>
                  <div>
                    <InlineMath math={fp_f} />
                  </div>
                  <div>a = {fp_a}</div>
                  <div>b = {fp_b}</div>
                  <div>tolerance = {fp_tolerance}</div>
                  <button
                    className={clsxm('btn mt-4', isLoading && 'loading')}
                    disabled={isLoading}
                    type='button'
                    onClick={calc_fp}
                  >
                    False Position
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
