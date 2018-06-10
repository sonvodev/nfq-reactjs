import { combineReducers, Reducer } from 'redux'
import NasaReducer from './nasa/nasa.reducer'
import { INasaState } from './nasa/nasa.state';

export interface IRootReducer {
  nasaReducer: Reducer<INasaState, any>
}

const reducers = combineReducers(<IRootReducer>{
  nasaReducer: NasaReducer
})

export default reducers
