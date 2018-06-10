import { Reducer } from "redux";
import { INasaState, NasaState } from "./nasa.state";
import { ITypedAction } from "../root.actions";

const initialNasaState = new NasaState({

})
const nasaReducer: Reducer<INasaState> =
  (state: INasaState = initialNasaState, action: ITypedAction<INasaState>): INasaState => {
    switch (action.type) {
      default:
        return state;
    }
  }
export default nasaReducer