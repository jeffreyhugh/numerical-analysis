import WolframAlphaAPI from '@tanzanite/wolfram-alpha';
import { NextApiRequest, NextApiResponse } from 'next';

import {
  EvaluateRequest,
  EvaluateResponse,
  EvaluateWAResponsePod,
} from '@/lib/types/Evaluate';

export default async function Route(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return handlePOST(req, res);
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

const handlePOST = async (
  req: NextApiRequest,
  res: NextApiResponse<EvaluateResponse>
) => {
  const wa = WolframAlphaAPI(process.env.WOLFRAM_APP_ID || '');

  // TODO add checking
  // NOT type-safe
  const { body }: { body: EvaluateRequest } = req;

  let rangeString = '';

  if (Array.isArray(body.values)) {
    rangeString = `{${body.values.join(', ')}}`;
  } else {
    rangeString = `Range[${body.values.min}, ${body.values.max}]`;
  }

  const queryString = `${body.func} where x = ${rangeString}`;

  const result = (await wa.getFull(
    queryString
  )) as unknown as EvaluateWAResponsePod;

  if (result.success) {
    if (result.pods) {
      const answerPods = result.pods.filter((pod) => pod.id == 'Result');
      if (Array.isArray(answerPods)) {
        const answerPod = answerPods[0];
        if (Array.isArray(answerPod.subpods)) {
          const values = answerPod.subpods[0].plaintext
            .slice(1, -1)
            .split(', ')
            .map((n) => Number(n));
          return res.status(200).json({ message: 'OK', values });
        } else {
          return res.status(500).json({
            message: 'Internal Server Error',
            values: [],
            raw: result,
          });
        }
      } else {
        return res
          .status(500)
          .json({ message: 'Internal Server Error', values: [], raw: result });
      }
    } else {
      return res
        .status(500)
        .json({ message: 'Internal Server Error', values: [], raw: result });
    }
  } else {
    return res
      .status(400)
      .json({ message: 'Bad Request', values: [], raw: result });
  }
};
