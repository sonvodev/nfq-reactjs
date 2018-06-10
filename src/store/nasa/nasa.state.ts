import { IBaseState } from "../root.state";

export interface INasaState extends IBaseState { }
export class NasaState implements INasaState {
  /**
   *
   */
  constructor(opt: INasaState = {}) {
  }
}