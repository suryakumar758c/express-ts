interface ApiResponseType {
  code: number;
  message: string;
  data: string | number | object | [] | null;
}

export type { ApiResponseType };
