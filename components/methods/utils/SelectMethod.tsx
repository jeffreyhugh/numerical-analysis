import * as React from 'react';

export default function SelectMethod({
  selectedMethod,
  handleMethodSelect,
}: {
  selectedMethod: string;
  handleMethodSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className='form control w-fill flex flex-col'>
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
  );
}
