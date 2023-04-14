export type DerivativeRequest = {
  func: string;
  order: number;
};

export type DerivativeResponse = {
  message: string;
  derivative: string;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw?: any;
};

export type DerivativeWAResponsePod = {
  success: boolean;
  pods?: {
    id: string;
    subpods?: {
      plaintext: string;
    }[];
  }[];
};
