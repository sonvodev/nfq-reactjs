export interface IApiResponse<T = any> {
  data?: T | T[] | null
  error?: any
  isSuccess?: any
}
export class ApiResponse<T = any> implements IApiResponse<T> {
  /**
   *
   */
  public data?: T | T[] | null
  public error?: any
  public isSuccess?: any

  constructor(success: boolean, opt: IApiResponse<T> = {}) {
    this.isSuccess = success;
    this.data = opt.data;
    this.error = opt.error
  }
}