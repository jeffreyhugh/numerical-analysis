import { wa_eval } from '@/lib/math/wa_eval';

export type SecantReturn = {
  input: {
    f: string;
    x0: number;
    x1: number;
    tolerance: number;
  };
  output: {
    current: number;
    middle: number;
    last: number;
    n: number;
    tolerance: number;
    f_middle: number;
    f_last: number;
  }[];
};

export const secant = async (
  f: string,
  x0: number,
  x1: number,
  tolerance: number
): Promise<SecantReturn> => {
  let last = x0;
  let middle = x1;
  const res = await wa_eval(f, [last, middle]);
  if (res.length === 0) {
    throw 'WolframAlpha API error; check the console';
  }
  let [fLast, fMiddle] = res;

  let current = middle - (fMiddle * (middle - last)) / (fMiddle - fLast);
  // number of iterations
  let n = 0;

  const outputData = [] as SecantReturn['output'];

  while (!secant_tolerance_ok(current, middle, n, tolerance)) {
    outputData.push({
      current,
      middle,
      last,
      n,
      tolerance: Math.abs(current - last),
      f_middle: fMiddle,
      f_last: fLast,
    });

    last = middle;
    middle = current;

    const res = await wa_eval(f, [last, middle]);
    if (res.length === 0) {
      throw 'WolframAlpha API error; check the console';
    }
    [fLast, fMiddle] = res;

    current = middle - (fMiddle * (middle - last)) / (fMiddle - fLast);

    n += 1;
  }

  outputData.push({
    current,
    middle,
    last,
    n,
    tolerance: Math.abs(current - last),
    f_middle: fMiddle,
    f_last: fLast,
  });

  return {
    input: {
      f,
      x0,
      x1,
      tolerance,
    },
    output: outputData,
  };
};

const secant_tolerance_ok = (
  current: number,
  last: number,
  n: number,
  tolerance: number
) => n > 15 || Math.abs(current - last) < tolerance;
