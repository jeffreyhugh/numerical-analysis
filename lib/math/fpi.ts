import { wa_derivative } from '@/lib/math/wa_derivative';
import { wa_eval } from '@/lib/math/wa_eval';

export const fpi = async (f: string, x0: number, tolerance: number) => {
  let last = x0;
  const res = await wa_eval(f, [last]);
  if (res.length === 0) {
    throw 'WolframAlpha API error; check the console';
  }
  let [current] = res;
  // number of iterations
  let n = 0;

  const df = await wa_derivative(f, 1);
  const [convergence_test] = await wa_eval(df, [x0]);
  if (Math.abs(convergence_test) >= 1) {
    throw 'Function does not converge at root guess';
  }

  while (!fpi_tolerance_ok(current, last, n, tolerance)) {
    last = current;

    const res = await wa_eval(f, [last]);
    if (res.length === 0) {
      throw 'WolframAlpha API error; check the console';
    }

    [current] = res;

    n += 1;
  }

  return {
    result: current,
    iterations: n,
  };
};

const fpi_tolerance_ok = (
  current: number,
  last: number,
  n: number,
  tolerance: number
) => n > 30 && Math.abs(current - last) < tolerance;
