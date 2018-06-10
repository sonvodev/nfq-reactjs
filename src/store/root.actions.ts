import { ActivityStatus } from "../common/enum";

export interface ITypedAction<T = any> {
  payload?: T
  error?: any
  meta?: any
  type: string
}

export class TypedAction<T = any> implements ITypedAction<T> {
  payload?: T
  error?: any
  meta?: any
  type: string
  /**
   *
   */
  constructor(type: string, opt: { payload?: T, error?: any, meta?: any }) {
    this.type = type
    this.payload = opt.payload
    this.error = opt.error
    this.meta = opt.meta
  }
}

export interface IRootAction {
  loadingActivity?(activity: ActivityStatus): ITypedAction<ActivityStatus>
  savingActivity?(activity: ActivityStatus): ITypedAction<ActivityStatus>
  fetchingActivity?(activity: ActivityStatus): ITypedAction<ActivityStatus>
}