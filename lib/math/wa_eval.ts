import { EvaluateRequest, EvaluateResponse } from '@/lib/types/Evaluate';

export const wa_eval = (
  func: string,
  values: number[] | { min: number; max: number }
) =>
  fetch('/api/evaluate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      func,
      values,
    } as EvaluateRequest),
  })
    .then((res) => res.json())
    .then((j: EvaluateResponse) => {
      if (j.message === 'OK') {
        return j.values;
      } else {
        //eslint-disable-next-line no-console
        console.log(j.raw);
        return [];
      }
    });
