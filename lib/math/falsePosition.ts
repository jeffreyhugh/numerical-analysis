import { wa_eval } from '@/lib/math/wa_eval';

export type FalsePositionReturn = {
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

export const falsePosition = async (
  f: string,
  a0: number,
  b0: number,
  tolerance: number
): Promise<FalsePositionReturn> => {
  let a = a0;
  let b = b0;
  let c = 0;
  // number of iterations
  let n = 0;

  let lastDiff = Infinity;

  const outputData = [] as FalsePositionReturn['output'];

  while (!falsePosition_tolerance_ok(a, b, lastDiff, n, tolerance)) {
    lastDiff = Math.abs(a - b);

    let res = await wa_eval(f, [a, b]);
    if (res.length === 0) {
      throw 'WolframAlpha API error; check the console';
    }

    const [f_a, f_b] = res;
    if (!f_a || !f_b) {
      break;
    }

    c = (b * f_a - a * f_b) / (f_a - f_b);

    res = await wa_eval(f, [c]);
    if (res.length === 0) {
      throw 'WolframAlpha API error; check the console';
    }

    const [f_c] = res;
    if (!f_c) {
      break;
    }

    if (f_a * f_c < 0) {
      b = c;
    } else {
      a = c;
    }

    outputData.push({
      a,
      b,
      c,
      n,
      tolerance: Math.abs(lastDiff - Math.abs(a - b)),
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

const falsePosition_tolerance_ok = (
  a: number,
  b: number,
  lastDiff: number,
  n: number,
  tolerance: number
) => n > 15 || Math.abs(lastDiff - Math.abs(a - b)) < tolerance;
