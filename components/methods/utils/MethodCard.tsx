import Link from 'next/link';
import * as React from 'react';
export default function MethodCard({
  name,
  description,
  href,
}: {
  name: string;
  description: string;
  href: string;
}) {
  return (
    <div className='card h-80 w-60 bg-base-100 shadow-xl'>
      <div className='card-body'>
        <h2 className='card-title'>{name}</h2>
        <p>{description}</p>
        <div className='card-actions justify-end'>
          <Link className='btn' href={href}>
            learn more
          </Link>
        </div>
      </div>
    </div>
  );
}
