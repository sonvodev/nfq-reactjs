import { IRootAction, ITypedAction } from "../root.actions"
import { ActivityStatus } from "../../common/enum";
import { INasaListing } from "../../models/nasa/nasa-listing.model.";
import { NasaTypes } from "./nasa.type";
import { IPagination } from "../../models/pagination";

export interface INasaAction extends IRootAction {
  loadingActivity?: (activity: ActivityStatus) => ITypedAction<ActivityStatus>
  setApods?: (payload: {
    records?: INasaListing[],
    pagination: IPagination
  }) => ITypedAction<INasaListing[]>
}
export class NasaAction implements INasaAction {
  loadingActivity?(activity: ActivityStatus): ITypedAction<ActivityStatus> {
    return { type: NasaTypes.ACTIVITY_LOADING, payload: activity }
  }
  setApods?(payload: {
    records?: INasaListing[],
    pagination: IPagination
  }): ITypedAction<any> {
    return { type: NasaTypes.FILTER_APODS_SUCCESS, payload: payload }
  }
}

const nasaActions = new NasaAction
export default nasaActions