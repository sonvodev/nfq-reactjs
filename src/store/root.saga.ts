import { all, takeLatest, fork } from "redux-saga/effects";
import { NasaTypes } from "./nasa/nasa.type";
import { watchFilterApods, watchFetchSuggestion, watchSaveApod, watchDeleteApod } from "./nasa/nasa.saga";

export function* rootSaga() {
  yield all([
    fork(watchFilterApods),
    fork(watchFetchSuggestion),
    fork(watchSaveApod),
    fork(watchDeleteApod),
    takeLatest(NasaTypes.FILTER_APODS, watchFilterApods)
  ])
}