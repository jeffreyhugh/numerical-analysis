import { wa_eval } from '@/lib/math/wa_eval';

export type BisectionReturn = {
  input: {
    f: string;
    a0: number;
    b0: number;
    tolerance: number;
  };
  output: {
    a: number;
    b: number;
    c: number;
    n: number;
    tolerance: number;
    f_a: number;
    f_b: number;
    f_c: number;
  }[];
};

export const bisection = async (
  f: string,
  a0: number,
  b0: number,
  tolerance: number
): Promise<BisectionReturn> => {
  let a = a0;
  let b = b0;
  let c = 0;
  // number of iterations
  let n = 0;

  const outputData = [] as BisectionReturn['output'];

  while (!bisection_tolerance_ok(a, b, n, tolerance)) {
    c = (a + b) / 2;

    const res = await wa_eval(f, [a, b, c]);
    if (res.length === 0) {
      throw 'WolframAlpha API error; check the console';
    }

    const [f_a, f_b, f_c] = res;

    if (f_a * f_c < 0) {
      b = c;
    } else if (f_b * f_c < 0) {
      a = c;
    } else {
      throw 'IVT does not apply on this range';
    }

    outputData.push({
      a,
      b,
      c,
      n,
      tolerance: (b - a) / 2 ** (n + 1),
      f_a,
      f_b,
      f_c,
    });

    n += 1;
  }

  return {
    input: {
      f,
      a0,
      b0,
      tolerance,
    },
    output: outputData,
  };
};

const bisection_tolerance_ok = (
  a: number,
  b: number,
  n: number,
  tolerance: number
) => n > 30 || (b - a) / 2 ** (n + 1) < tolerance;
