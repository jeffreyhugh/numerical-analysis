import { wa_eval } from '@/lib/math/wa_eval';

export const falsePosition = async (
  f: string,
  a0: number,
  b0: number,
  tolerance: number
) => {
  let a = a0;
  let b = b0;
  let c = 0;
  // number of iterations
  let n = 0;

  let lastDiff = Infinity;

  while (!falsePosition_tolerance_ok(a, b, lastDiff, n, tolerance)) {
    lastDiff = Math.abs(a - b);

    let res = await wa_eval(f, [a, b]);
    if (res.length === 0) {
      throw 'WolframAlpha API error; check the console';
    }

    const [f_a, f_b] = res;

    c = (b * f_a - a * f_b) / (f_a - f_b);

    res = await wa_eval(f, [c]);
    if (res.length === 0) {
      throw 'WolframAlpha API error; check the console';
    }

    const [f_c] = res;
    if (f_a * f_c < 0) {
      b = c;
    } else {
      a = c;
    }

    n += 1;
  }

  return {
    result: (a + b) / 2,
    iterations: n,
  };
};

const falsePosition_tolerance_ok = (
  a: number,
  b: number,
  lastDiff: number,
  n: number,
  tolerance: number
) => n > 15 || Math.abs(lastDiff - Math.abs(a - b)) < tolerance;
