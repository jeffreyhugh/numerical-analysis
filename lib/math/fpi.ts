import { wa_derivative } from '@/lib/math/wa_derivative';
import { wa_eval } from '@/lib/math/wa_eval';

export type FPIReturn = {
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

export const fpi = async (
  f: string,
  x0: number,
  tolerance: number
): Promise<FPIReturn> => {
  let last = Infinity;
  // const res = await wa_eval(f, [last]);
  // if (res.length === 0) {
  //   throw 'WolframAlpha API error; check the console';
  // }
  let current = x0;
  // number of iterations
  let n = 0;

  const df = await wa_derivative(f, 1);
  let res = await wa_eval(df, [x0]);
  if (res.length === 0) {
    throw 'WolframAlpha API error; check the console';
  }
  const [convergence_test] = res;
  if (!convergence_test) {
    throw 'Null value returned from WolframAlpha';
  } else if (Math.abs(convergence_test) >= 1) {
    throw 'Function does not converge at root guess';
  }

  const outputData = [] as FPIReturn['output'];

  while (!fpi_tolerance_ok(current, last, n, tolerance)) {
    outputData.push({
      current,
      last,
      n,
      tolerance: Math.abs(current - last),
    });

    last = current;

    res = await wa_eval(f, [last]);
    if (res.length === 0) {
      throw 'WolframAlpha API error; check the console';
    }

    [current] = res;
    if (!current) {
      break;
    }

    n += 1;
  }

  if (current && last && n) {
    outputData.push({
      current,
      last,
      n,
      tolerance: Math.abs(current - last),
    });
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

const fpi_tolerance_ok = (
  current: number,
  last: number,
  n: number,
  tolerance: number
) => n > 30 || Math.abs(current - last) < tolerance;
