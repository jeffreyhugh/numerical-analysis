import * as React from 'react';

import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import Layout from '@/components/layout/Layout';
import MethodCard from '@/components/methods/utils/MethodCard';
import Seo from '@/components/Seo';
const methodData = [
  {
    name: 'Bisection Method',
    description:
      'A simple method that repeatedly divides an interval containing a root into two subintervals.',
    href: '/methods/bisection',
  },
  {
    name: 'Fixed-Point Iteration',
    description:
      ' An iterative method that finds the point where a given function intersects the identity function.',
    href: '/methods/fixed-point',
  },
  {
    name: 'Newton Method',
    description:
      "A fast-converging method that uses linear approximation and the function's derivative to find the root.",
    href: '/methods/newton',
  },
  {
    name: 'Secant Method',
    description:
      " An iterative method that approximates the root using secant lines without requiring the function's derivative.",
    href: '/methods/secant',
  },
  {
    name: 'False Position',
    description:
      'Combining the Bisection method and the Secant method to find the root, ensuring fast convergence.',
    href: '/methods/false-position',
  },
];

export default function Page() {
  return (
    <Layout>
      <Seo templateTitle='Explore' />

      <main className='flex flex-grow'>
        <section className='flex flex-grow'>
          <div className='layout min-h-c'>
            <Breadcrumbs />
            <div className='flex flex-row flex-wrap items-center justify-center gap-4'>
              {methodData.map((method) => (
                <MethodCard
                  key={method.name}
                  name={method.name}
                  description={method.description}
                  href={method.href}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
