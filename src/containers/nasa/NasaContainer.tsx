import * as React from 'react';
import './NasaContainer.scss';
import { IProps, IState, PropsMapper } from './NasaContainerPropsState';
import { IRootReducer } from '../../store/root.reducer';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ITypedAction } from '../../store';
import { INasaParameter, NasaParameter } from '../../models/nasa/nasa-parameter.model';
import { NasaTypes } from '../../store/nasa/nasa.type';

import { ActionComponent, ModalComponent } from '../../components'
import { Message } from 'element-react'
import NasaListingComponent from './components/nasa-listing/NasaListing'
import NasaExportButton from './components/nasa-export-button/NasaExportButton'
import { INasaListing, NasaListing } from '../../models/nasa/nasa-listing.model';
import NasaEditingModal from './components/nasa-editing/NasaEditingModal';
import ReactPlayer from 'react-player';
import { MediaTypes } from '../../common/enum';
import { Image } from 'react-bootstrap'

class NasaContainer extends React.Component<IProps, IState>{
  /**
   *
   */
  private _clearTimeout: any
  constructor(props: Readonly<IProps>) {
    super(props);
    this.state = {
      searchParameter: new NasaParameter(),
      modalVisible: false,
      apod: null,
      isPreviewing: false
    }
  }

  get title(): string | null {
    if (this.state.apod === null && this.state.modalVisible) {
      return 'Create Apod';
    }
    else if (this.state.apod !== null && this.state.modalVisible) {
      return this.state.apod.title!
    }
    return null;
  }
  componentDidMount() {
    this.props.loadApods!(this.state.searchParameter)
      .catch((error: any) => Message.error(error))
  }

  handleDelete(apod: INasaListing) {
    console.log(apod)
  }

  handleModalVisible(isPreviewing: boolean, apod: INasaListing) {
    clearTimeout(this._clearTimeout)
    this._clearTimeout = setTimeout(() => {
      this.setState({ modalVisible: true, apod, isPreviewing })
    }, 300);
  }

  handleCreate(visible: boolean) {
    clearTimeout(this._clearTimeout)
    this._clearTimeout = setTimeout(() => {
      this.setState({
        modalVisible: visible,
        isPreviewing: false,
        apod: visible ? new NasaListing({
          title: '',
          date: '',
          explanation: ''
        }) : null
      })
    }, 300);
  }
  _renderPreviewContent(apod: INasaListing) {
    if (this.state.apod!.media_type === MediaTypes.Image) {
      return <Image style={{ width: '100%', objectFit: 'cover' }} src={apod.hdurl} />
    }
    return <ReactPlayer style={{ width: '100%' }} playsInline url={apod.url} config={{ youtube: { playerVars: { showinfo: 1 } } }} poster={apod.hdurl} playing />
  }
  _renderModalContent() {
    return this.state.isPreviewing
      ? (this.state.apod !== null && this._renderPreviewContent(this.state.apod))
      : <NasaEditingModal entity={this.state.apod!} />
  }
  render() {
    const { apods, pagination } = this.props
    return (
      <div>
        <ActionComponent
          onCreate={this.handleCreate.bind(this, true)}
        >
          <NasaExportButton data={apods!} />
        </ActionComponent>
        <div className="container">
          <NasaListingComponent source={apods!} pagination={pagination!}
            param={this.state.searchParameter}
            fetchData={this.props.loadApods!.bind(this)}
            onDeleteClick={this.handleDelete.bind(this)}
            onDoubleClick={this.handleModalVisible.bind(this, false)}
            onPreviewClick={this.handleModalVisible.bind(this, true)}
          />
        </div>
        <ModalComponent show={this.state.modalVisible}
          title={this.title!}
          showHeader={this.title! !== null}
          onClose={this.handleCreate.bind(this, false)}
        >
          {this.state.apod && this._renderModalContent()}
        </ModalComponent>
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