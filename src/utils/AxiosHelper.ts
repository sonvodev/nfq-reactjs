import { AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpStatusCode } from "../common/enum/http-status.enum";
import { ApiResponse } from "../models/api-response";

export class AxiosHelper {
  static statusValidator(statusCode: number): boolean {
    return statusCode >= 200 && statusCode <= 503
  }
  static requestInterceptor(config: AxiosRequestConfig) {
    return config;
  }
  static responseIntercetor(response: AxiosResponse): any {
    switch (response.status) {
      case HttpStatusCode.OK:
        return new ApiResponse(true, { data: response.data });
      default:
        return new ApiResponse(false, { error: response.statusText });
    }


  }
  static exceptionHandler(error: any) {
    return error;
  }
}