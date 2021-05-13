import { apiResponse } from "../helpers/common.helper";

import type { Response } from "express";

import type { ApiResponseType } from "../types/common/index.types";

class CommonController {
  /**
   * api response
   * @param response response
   * @param data response data
   * @param message success or error message
   * @param code status code
   */
  private setResponse(
    response: Response,
    data: any = null,
    message: string = "",
    code: number = 400
  ): void {
    const responseBody: ApiResponseType = apiResponse(code, message, data);
    response.status(responseBody.code).json(responseBody);
  }

  /**
   * api success response
   * @param response response
   * @param data response data
   * @param message response message
   * @param code status code
   */
  public setApiSuccessResponse(
    response: Response,
    data: any = null,
    message: string = "Success",
    code: number = 200
  ): void {
    this.setResponse(response, data, message, code);
  }

  /**
   * api error response
   * @param response response
   * @param data response data
   * @param message response message
   * @param code status code
   */
  public setApiErrorResponse(
    response: Response,
    data: Error,
    message: string = "Error",
    code: number = 400
  ): void {
    console.error(data);
    this.setResponse(response, data.message, message, code);
  }
}

export default CommonController;
