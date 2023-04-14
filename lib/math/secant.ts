import { wa_eval } from '@/lib/math/wa_eval';

export const secant = async (
  f: string,
  x0: number,
  x1: number,
  tolerance: number
) => {
  let last = x0;
  let middle = x1;
  const res = await wa_eval(f, [last, middle]);
  if (res.length === 0) {
    throw 'WolframAlpha API error; check the console';
  }
  const [fLast, fMiddle] = res;

  const resFinal = await wa_eval(
    `0x + ${middle} - \\frac{${fMiddle} * (${middle} - ${last})}{${fMiddle} - ${fLast}}`,
    [0]
  );
  if (resFinal.length === 0) {
    throw 'WolframAlpha API error; check the console';
  }
  let [current] = resFinal;
  // number of iterations
  let n = 0;

  while (!secant_tolerance_ok(current, middle, n, tolerance)) {
    last = middle;
    middle = current;

    const res = await wa_eval(f, [last, middle]);
    if (res.length === 0) {
      throw 'WolframAlpha API error; check the console';
    }
    const [fLast, fMiddle] = res;

    const resFinal = await wa_eval(
      `0x + ${middle} - \\frac{${fMiddle} * (${middle} - ${last})}{${fMiddle} - ${fLast}}`,
      [0]
    );
    if (resFinal.length === 0) {
      throw 'WolframAlpha API error; check the console';
    }

    [current] = resFinal;

    n += 1;
  }

  return {
    result: current,
    iterations: n,
  };
};

const secant_tolerance_ok = (
  current: number,
  last: number,
  n: number,
  tolerance: number
) => n <= 15 && Math.abs(current - last) < tolerance;
