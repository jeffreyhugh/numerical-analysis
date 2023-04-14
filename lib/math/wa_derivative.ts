import { DerivativeRequest, DerivativeResponse } from '@/lib/types/Derivative';

export const wa_derivative = (func: string, order: number) =>
  fetch('/api/derivative', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      func,
      order,
    } as DerivativeRequest),
  })
    .then((res) => res.json())
    .then((j: DerivativeResponse) => {
      if (j.message === 'OK') {
        return j.derivative;
      } else {
        //eslint-disable-next-line no-console
        console.log(j.raw);
        return '';
      }
    });
