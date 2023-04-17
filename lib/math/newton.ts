import { wa_derivative } from '@/lib/math/wa_derivative';
import { wa_eval } from '@/lib/math/wa_eval';

export const newton = async (f: string, x0: number, tolerance: number) => {
  const df = await wa_derivative(f, 1);

  let last = x0;
  let current = 0;
  // number of iterations
  let n = 0;

  while (!newton_tolerance_ok(current, last, n, tolerance)) {
    last = current;

    const res = await wa_eval(`${last} - \\frac{${f}}{${df}}`, [last]);
    if (res.length === 0) {
      throw 'WolframAlpha API error; check the console';
    }

    last = current;
    [current] = res;

    n += 1;
  }

  return {
    result: current,
    iterations: n,
  };
};

const newton_tolerance_ok = (
  current: number,
  last: number,
  n: number,
  tolerance: number
) => n > 30 && Math.abs(current - last) < tolerance;
