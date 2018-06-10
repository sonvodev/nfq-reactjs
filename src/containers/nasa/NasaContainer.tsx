import * as React from 'react';
import './NasaContainer.scss';
import { IProps, IState, PropsMapper } from './NasaContainerPropsState';
import { IRootReducer } from '../../store/root.reducer';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ITypedAction } from '../../store';
import { INasaParameter, NasaParameter } from '../../models/nasa/nasa-parameter.model';
import { NasaTypes } from '../../store/nasa/nasa.type';

import { ActionComponent } from '../../components'
import { Message } from 'element-react'
import NasaListing from './components/nasa-listing/NasaListing'
import { INasaListing } from '../../models/nasa/nasa-listing.model.';

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
      .catch((error: any) => Message.error(error))
  }

  handleDelete(apod: INasaListing) {
    console.log(apod)
  }
  handlePreview(apod: INasaListing) {
    console.log(apod)
  }
  handleModalVisible(isPreview: boolean, apod: INasaListing) {
    console.log(isPreview, apod)
  }
  render() {
    const { apods, pagination } = this.props
    return (
      <div>
        <ActionComponent />
        <div className="container">
          <NasaListing source={apods!} pagination={pagination!}
            onDeleteClick={this.handleDelete.bind(this)}
            onDoubleClick={this.handleModalVisible.bind(this, false)}
            onPreviewClick={this.handleModalVisible.bind(this, true)}
          />
        </div>
      </div>
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