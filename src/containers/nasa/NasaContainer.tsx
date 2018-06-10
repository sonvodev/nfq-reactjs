import * as React from 'react';
import './NasaContainer.scss';
import { IProps, IState, PropsMapper } from './NasaContainerPropsState';
import { IRootReducer } from '../../store/root.reducer';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ITypedAction } from '../../store';
import { INasaParameter, NasaParameter } from '../../models/nasa/nasa-parameter.model';
import { NasaTypes } from '../../store/nasa/nasa.type';

class NasaContainer extends React.Component<IProps, IState>{
  /**
   *
   */

  constructor(props: Readonly<IProps>) {
    super(props);
    this.state = {
      searchParameter: new NasaParameter()
    }
  }
  componentDidMount() {
    this.props.loadApods!(this.state.searchParameter)
  }
  render() {
    return (
      <div>Nasa Container</div>
    );
  }
}

const mapStateToProps = (state: IRootReducer) => {
  return { ... new PropsMapper(state.nasaReducer) }
}
const mapDispatchToProps = (dispatch: Dispatch<ITypedAction<any>>) => {
  return {
    loadApods: (param: INasaParameter) => {
      return new Promise(
        (resolve, reject) => {
          dispatch({ type: NasaTypes.FILTER_APODS, payload: param, meta: { resolve, reject } })
        }
      )
    }
  }
}
export default connect<any, any, IProps>(mapStateToProps, mapDispatchToProps)(NasaContainer);