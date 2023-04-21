import { graphData } from '@/components/methods/Bisection';

const data: graphData[] = [];

let i = -1.5;
while (i <= 1.5) {
  data.push({
    x: parseFloat(i.toPrecision(6)),
    y: parseFloat((i ** 3 - 2 * i ** 2 + 2).toPrecision(6)),
  });
  i += 0.1;
}

export default data;
