import Link from 'next/link';
import * as React from 'react';

import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function HomePage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className=''>
          <div className='layout min-h-c'>
            <Breadcrumbs />
            <div className='hero'>
              <div className='hero-content text-center'>
                <div className='flex max-w-md flex-col items-center justify-center'>
                  <h1 className='h1 mt-4'>Numerical Analysis</h1>
                  <h3 className='h3 mt-4 flex max-w-md flex-wrap gap-2'>
                    Explore ways to solve equations and find roots using various
                    numerical methods, including the Bisection Method,
                    Fixed-Point Iteration, and more.
                  </h3>
                  <div className='btn-group btn-group-vertical mt-6'>
                    {/* Add methods page */}
                    <Link className='btn' href='/methods'>
                      Explore Methods
                    </Link>
                    {/* Add compare page */}
                    <Link className='btn' href='/'>
                      Compare Methods
                    </Link>
                    {/* Remove in prod */}
                    <Link className='btn' href='/playground'>
                      Playground
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
