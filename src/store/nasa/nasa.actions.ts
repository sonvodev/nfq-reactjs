import { IRootAction, ITypedAction } from "../root.actions"
import { ActivityStatus } from "../../common/enum";
import { INasaListing } from "../../models/nasa/nasa-listing.model";
import { NasaTypes } from "./nasa.type";
import { IPagination } from "../../models/pagination";

export interface INasaAction extends IRootAction {
  setApods?: (payload: {
    records?: INasaListing[],
    pagination: IPagination
  }) => ITypedAction<INasaListing[]>
  setSuggestion?: (suggestion: INasaListing[]) => ITypedAction<INasaListing[]>
}
export class NasaAction implements INasaAction {
  loadingActivity?(activity: ActivityStatus): ITypedAction<ActivityStatus> {
    return { type: NasaTypes.ACTIVITY_LOADING, payload: activity }
  }
  fetchingActivity?(activity: ActivityStatus): ITypedAction<ActivityStatus> {
    return { type: NasaTypes.ACTIVITY_LOADING, payload: activity }
  }

  setApods?(payload: {
    records?: INasaListing[],
    pagination: IPagination
  }): ITypedAction<any> {
    return { type: NasaTypes.FILTER_APODS_SUCCESS, payload: payload }
  }
  setSuggestion(suggestion: INasaListing[]): ITypedAction<INasaListing[]> {
    return { type: NasaTypes.FETCH_APODS_SUCCESS, payload: suggestion }
  }
}

const nasaActions = new NasaAction
export default nasaActions