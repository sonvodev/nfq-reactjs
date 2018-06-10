import { all, takeLatest, fork } from "redux-saga/effects";
import { NasaTypes } from "./nasa/nasa.type";
import { watchFilterApods } from "./nasa/nasa.saga";

export function* rootSaga() {
  yield all([
    fork(watchFilterApods),
    takeLatest(NasaTypes.FILTER_APODS, watchFilterApods)
  ])
}