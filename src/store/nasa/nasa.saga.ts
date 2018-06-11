import { takeEvery, put, takeLatest } from "redux-saga/effects";
import { ITypedAction } from "../index";
import { INasaParameter } from "../../models/nasa/nasa-parameter.model";
import { NasaTypes } from "./nasa.type";
import { NasaService } from "../../services/nasa.service";
import nasaActions from "./nasa.actions";
import { ActivityStatus } from "../../common/enum";
import { INasaListing } from "../../models/nasa/nasa-listing.model";

const service = new NasaService('nasa_apod');

export function* filterApods(action: ITypedAction<INasaParameter>) {
  try {
    yield put(nasaActions.setActivity!(ActivityStatus.Loading, NasaTypes.ACTIVITY_LOADING))
    const result = yield service.filterApods(action.payload!)
    if (result) {
      yield put(nasaActions.setApods!(result))
      yield action.meta.resolve(result)
    } else { yield action.meta.reject(result) }

  }
  catch (ex) {
    yield action.meta.reject(ex)
  }
}

export function* fetchSuggestion(action: ITypedAction<string>) {
  try {
    yield put(nasaActions.setActivity!(ActivityStatus.Loading, NasaTypes.FETCH_ACTIVITY_LOADING))
    const result = yield service.fetchSuggestion(action.payload!)
    if (result) {
      yield put(nasaActions.setSuggestion!(result))
      yield action.meta.resolve(result)
    } else { yield action.meta.reject(result) }

  }
  catch (ex) {
    yield action.meta.reject(ex)
  }
}

export function* saveApod(action: ITypedAction<INasaListing>) {
  try {
    yield put(nasaActions.setActivity!(ActivityStatus.Loading, NasaTypes.SAVE_ACTIVITY_LOADING))
    const result = yield service.saveApod(action.payload!)
    if (result) {
      yield put(nasaActions.setActivity!(ActivityStatus.Loading, NasaTypes.SAVE_ACTIVITY_LOADING))
      yield action.meta.resolve(result)
    } else { yield action.meta.reject(result) }
  }
  catch (ex) {
    yield action.meta.reject(ex)
  }
}

export function* deleteApod(action: ITypedAction<string>) {
  try {
    yield put(nasaActions.setActivity!(ActivityStatus.Loading, NasaTypes.SAVE_ACTIVITY_LOADING))
    const result = yield service.deleteApod(action.payload!)
    if (result) {
      yield put(nasaActions.setActivity!(ActivityStatus.Loading, NasaTypes.SAVE_ACTIVITY_LOADING))
      yield action.meta.resolve(result)
    } else { yield action.meta.reject(result) }
  }
  catch (ex) {
    yield action.meta.reject(ex)
  }
}

export function* watchFilterApods() {
  yield takeEvery(NasaTypes.FILTER_APODS, filterApods)
}
export function* watchFetchSuggestion() {
  yield takeLatest(NasaTypes.FETCH_APODS, fetchSuggestion)
}
export function* watchSaveApod() {
  yield takeLatest(NasaTypes.SAVE_APOD, saveApod)
}

export function* watchDeleteApod() {
  yield takeLatest(NasaTypes.DELETE_APOD, deleteApod)
}