import type { ApiResponseType } from "../types/common/index.types";

const apiResponse = (
  code: number = 400,
  message: string = "",
  data: any = null
): ApiResponseType => {
  return {
    code,
    message,
    data,
  };
};

export { apiResponse };
