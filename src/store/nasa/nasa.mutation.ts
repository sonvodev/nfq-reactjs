import { INasaListing } from "../../models/nasa/nasa-listing.model";
import { IPagination } from "../../models/pagination";
import { INasaState } from "./nasa.state";
import { ActivityStatus } from "../../common/enum";
import { ITypedAction } from "..";

interface ILoadingPayload<T> {
  records: T[]
  pagination: IPagination
}

export interface INasaMuatation {
  receivedApods: (state: INasaState, action: ITypedAction<ILoadingPayload<INasaListing>>) => void
  receivedSuggestions: (state: INasaState, action: ITypedAction<ILoadingPayload<INasaListing>>) => void
}
export class NasaMuatation implements INasaMuatation {
  receivedApods(state: INasaState, action: ITypedAction<ILoadingPayload<INasaListing>>) {
    return Object.assign({}, state, {
      apods: action.payload!.records,
      pagination: action.payload!.pagination,
      listingActivityStatus: ActivityStatus.Loaded
    })
  }
  receivedSuggestions(state: INasaState, action: ITypedAction<ILoadingPayload<INasaListing>>) {
    return Object.assign({}, state, {
      fetchingActivityStatus: ActivityStatus.Loaded,
      suggestions: action.payload
    })
  }
}

const _mutation = new NasaMuatation
export default _mutation