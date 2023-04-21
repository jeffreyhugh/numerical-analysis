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

  let res = await wa_eval(f, [a, b]);
  if (res.length === 0) {
    throw 'WolframAlpha API error; check the console';
  }

  const [ivt_a, ivt_b] = res;
  if (ivt_a * ivt_b > 0) {
    throw 'IVT does not apply on this range';
  }

  const outputData = [] as BisectionReturn['output'];

  while (!bisection_tolerance_ok(a, b, n, tolerance)) {
    const dataA = a;
    const dataB = b;
    const dataC = c;

    c = (a + b) / 2;

    res = await wa_eval(f, [a, b, c]);
    if (res.length === 0) {
      throw 'WolframAlpha API error; check the console';
    }

    const [f_a, f_b, f_c] = res;

    if (f_a * f_c < 0) {
      b = c;
    } else {
      a = c;
    }

    outputData.push({
      a: dataA,
      b: dataB,
      c: dataC,
      n,
      tolerance: Math.abs(b - a),
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
) => n > 30 || Math.abs(b - a) < tolerance;
