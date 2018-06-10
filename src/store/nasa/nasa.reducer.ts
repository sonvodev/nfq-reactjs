import { Reducer } from "redux";
import { INasaState, NasaState } from "./nasa.state";
import { ITypedAction } from "../root.actions";
import { NasaTypes } from "./nasa.type";
import _mutation from "./nasa.mutation";

const initialNasaState = new NasaState({
  apods: [],
  pagination: {}
})
const nasaReducer: Reducer<INasaState> =
  (state: INasaState = initialNasaState, action: ITypedAction<any>): INasaState => {
    switch (action.type) {
      case NasaTypes.FILTER_APODS_SUCCESS:
        return _mutation.receivedApods(state, action)
      default:
        return state;
    }
  }
export default nasaReducer