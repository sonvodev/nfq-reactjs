export interface IParameterBaseModel {
  count?: number
  pageIndex?: number
}
export class ParameterBasemModel implements IParameterBaseModel {
  /**
   *
   */
  count?: number
  pageIndex?: number

  constructor(opt: IParameterBaseModel = {}) {
    Object.keys(opt).forEach(key => this[key] = opt[key])
  }
}