import { ActivityStatus } from "../common/enum";

export interface IRootState {
  activityStatus?: ActivityStatus
}
export interface IBaseState<TService = any> extends IRootState {
  listingActivityStatus?: ActivityStatus;
  savingActivityStatus?: ActivityStatus;
  fetchingActivityStatus?: ActivityStatus
}
export class RootState implements IRootState {
  activityStatus?: ActivityStatus
  constructor(opt: IRootState = {}) {
    this.activityStatus = opt.activityStatus || ActivityStatus.NoActivity
  }
}
export class BaseState<TService = any> extends RootState implements IBaseState<TService> {
  listingActivityStatus?: ActivityStatus;
  savingActivityStatus?: ActivityStatus;
  fetchingActivityStatus?: ActivityStatus
  /**
   *
   */
  constructor(opt: IBaseState = {}) {
    super(opt)
  }
}
export const initialState = new RootState({ activityStatus: ActivityStatus.NoActivity })