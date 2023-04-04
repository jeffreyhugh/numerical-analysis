export type EvaluateRequest = {
  func: string;
  values: number[] | { min: number; max: number };
};

export type EvaluateResponse = {
  message: string;
  values: number[];
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw?: any;
};

export type EvaluateWAResponsePod = {
  success: boolean;
  pods?: {
    id: string;
    subpods?: {
      plaintext: string;
    }[];
  }[];
};
