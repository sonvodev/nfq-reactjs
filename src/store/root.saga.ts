import { all, takeLatest, fork } from "redux-saga/effects";
import { NasaTypes } from "./nasa/nasa.type";
import { watchFilterApods, watchFetchSuggestion } from "./nasa/nasa.saga";

export function* rootSaga() {
  yield all([
    fork(watchFilterApods),
    fork(watchFetchSuggestion),
    takeLatest(NasaTypes.FILTER_APODS, watchFilterApods)
  ])
}