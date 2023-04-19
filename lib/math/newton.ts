import { wa_derivative } from '@/lib/math/wa_derivative';
import { wa_eval } from '@/lib/math/wa_eval';

export type NewtonReturn = {
  input: {
    f: string;
    df: string;
    x0: number;
    tolerance: number;
  };
  output: {
    current: number;
    last: number;
    n: number;
    tolerance: number;
  }[];
};

export const newton = async (
  f: string,
  x0: number,
  tolerance: number
): Promise<NewtonReturn> => {
  const df = await wa_derivative(f, 1);

  let last = Infinity;
  let current = x0;
  // number of iterations
  let n = 0;

  const outputData = [] as NewtonReturn['output'];

  while (!newton_tolerance_ok(current, last, n, tolerance)) {
    outputData.push({
      current,
      last,
      n,
      tolerance: Math.abs(current - last),
    });

    last = current;

    const res = await wa_eval(`${last} - \\frac{${f}}{${df}}`, [last]);
    if (res.length === 0) {
      throw 'WolframAlpha API error; check the console';
    }

    [current] = res;

    n += 1;
  }

  return {
    input: {
      f,
      df,
      x0,
      tolerance,
    },
    output: outputData,
  };
};

const newton_tolerance_ok = (
  current: number,
  last: number,
  n: number,
  tolerance: number
) => n > 30 || Math.abs(current - last) < tolerance;
