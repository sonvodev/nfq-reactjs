import { takeEvery, put } from "redux-saga/effects";
import { ITypedAction } from "../index";
import { INasaParameter } from "../../models/nasa/nasa-parameter.model";
import { NasaTypes } from "./nasa.type";
import { NasaService } from "../../services/nasa.service";
import nasaActions from "./nasa.actions";
import { ActivityStatus } from "../../common/enum";

const service = new NasaService('nasa_apod');

export function* filterApods(action: ITypedAction<INasaParameter>) {
  try {
    yield put(nasaActions.loadingActivity!(ActivityStatus.Loading))
    const result = yield service.filterApods(action.payload!)
    if (result) {
      yield put(nasaActions.setApods!(result))
    } else { yield action.meta.reject(result) }

  }
  catch (ex) {
    yield action.meta.reject(ex)
  }
}
export function* watchFilterApods() {
  yield takeEvery(NasaTypes.FILTER_APODS, filterApods)
}