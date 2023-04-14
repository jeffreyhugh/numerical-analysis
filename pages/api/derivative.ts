import WolframAlphaAPI from '@tanzanite/wolfram-alpha';
import { NextApiRequest, NextApiResponse } from 'next';

import {
  DerivativeRequest,
  DerivativeResponse,
  DerivativeWAResponsePod,
} from '@/lib/types/Derivative';

export default async function Route(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return handlePOST(req, res);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

const handlePOST = async (
  req: NextApiRequest,
  res: NextApiResponse<DerivativeResponse>
) => {
  const wa = WolframAlphaAPI(process.env.WOLFRAM_APP_ID || '');

  const { body }: { body: DerivativeRequest } = req;

  const queryString = `D[${body.func}, {x, ${body.order}}]`;

  const result = (await wa.getFull(
    queryString
  )) as unknown as DerivativeWAResponsePod;

  if (result.success) {
    if (result.pods) {
      const answerPods = result.pods.filter((pod) => pod.id === 'Input');
      if (Array.isArray(answerPods)) {
        const answerPod = answerPods[0];
        if (Array.isArray(answerPod.subpods)) {
          const derivative = answerPod.subpods[0].plaintext.split('= ')[1];
          return res.status(200).json({ message: 'OK', derivative });
        } else {
          return res.status(500).json({
            message: 'Internal Server Error',
            derivative: '',
            raw: result,
          });
        }
      } else {
        return res.status(500).json({
          message: 'Internal Server Error',
          derivative: '',
          raw: result,
        });
      }
    } else {
      return res.status(500).json({
        message: 'Internal Server Error',
        derivative: '',
        raw: result,
      });
    }
  } else {
    return res
      .status(400)
      .json({ message: 'Bad Request', derivative: '', raw: result });
  }
};
