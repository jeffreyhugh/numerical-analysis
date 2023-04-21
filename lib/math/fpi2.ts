import { wa_derivative } from '@/lib/math/wa_derivative';
import { wa_eval } from '@/lib/math/wa_eval';

export type FPI2Return = {
  input: {
    f: string;
    g: string;
    dg: string;
    x0: number;
    tolerance: number;
  };
  output: {
    current: number;
    last: number;
    n: number;
    fcurrent: number;
    tolerance: number;
  }[];
};

export const fpi2 = async (
  f: string,
  g: string,
  x0: number,
  tolerance: number
) => {
  let last = Infinity;
  let current = x0;
  // number of iterations
  let n = 0;

  const dg = await wa_derivative(g, 1);
  const [convergence_test] = await wa_eval(dg, [x0]);
  if (Math.abs(convergence_test) >= 1) {
    throw 'Function does not converge at root guess';
  }

  let res = await wa_eval(f, [current]);
  if (res.length === 0) {
    throw 'WolframAlpha API error; check the console';
  }
  let [fcurrent] = res;

  const outputData = [] as FPI2Return['output'];

  while (!fpi2_tolerance_ok(current, last, n, tolerance)) {
    outputData.push({
      current,
      last,
      n,
      tolerance: current - last,
      fcurrent,
    });

    last = current;
    res = await wa_eval(g, [last]);
    if (res.length === 0) {
      throw 'WolframAlpha API error; check the console';
    }

    [current] = res;

    res = await wa_eval(f, [current]);
    if (res.length === 0) {
      throw 'WolframAlpha API error; check the console';
    }
    [fcurrent] = res;

    n += 1;
  }

  outputData.push({
    current,
    last,
    n,
    tolerance: current - last,
    fcurrent,
  });

  return {
    input: {
      f,
      g,
      dg,
      x0,
      tolerance,
    },
    output: outputData,
  };
};

const fpi2_tolerance_ok = (
  current: number,
  last: number,
  n: number,
  tolerance: number
) => n > 15 || Math.abs(current - last) < tolerance;
