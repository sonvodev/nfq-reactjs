import { IParameterBaseModel, ParameterBasemModel } from "../parameter.basemodel";

export interface INasaParameter extends IParameterBaseModel {
  api_key?: string
  date?: string
}
export class NasaParameter extends ParameterBasemModel implements INasaParameter {
  /**
   *
   */
  constructor(opt: INasaParameter = {}) {
    super(opt);
  }
}