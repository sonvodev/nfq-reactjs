import * as React from 'react';
import { IProps, IState, PropsMapper } from './NasaEditingModalPropsState';
import './NasaEditingModal.scss'
import { Row, Col, FormGroup, ControlLabel, FormControl, Clearfix } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { ActivityStatus, MediaTypes } from '../../../../common/enum';
import { INasaListing } from '../../../../models/nasa/nasa-listing.model';
import { IRootReducer } from '../../../../store/root.reducer';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ITypedAction } from '../../../../store';
import { NasaTypes } from '../../../../store/nasa/nasa.type';
import { Upload, Message } from 'element-react'
class NasaEditingModal extends React.Component<IProps, IState>{
  /**
   *
   */
  constructor(props: Readonly<IProps>) {
    super(props);
    this.state = {
      apod: props.entity,
      suggestions: props.suggestions!
    }
    this.handleSearch = props.onFetchSuggestion!.bind(this)
    this.handleSelect = props.onSelect!.bind(this)
  }

  componentWillReceiveProps(props: IProps) {
    this.setState({
      suggestions: props.suggestions!,
      apod: props.entity
    })
  }

  handleChange(target: any, key: string) {
    const { apod } = this.state
    apod[key] = key === 'title' ? target : target.value
    this.setState({ ...this.state, apod })
  }

  handleSearch(query: string) { }
  handleSelect(value: INasaListing[]) { }


  handleAvatarSuccess(res: any, file: any) {
    const { apod } = this.state
    apod.url = URL.createObjectURL(file.raw)
    this.setState({ apod: apod })
  }

  beforeAvatarUpload(file: any) {
    const isImage = file.type === MediaTypes.ImageJPEG || file.type === MediaTypes.ImagePNG || file.type === MediaTypes.ImageJPG;
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isImage) {
      Message('Avatar picture must be JPG format!');
    }
    if (!isLt2M) {
      Message('Avatar picture size can not exceed 2MB!');
    }
    return isImage && isLt2M;
  }

  _renderElementUpload(media_type: string, url: string) {
    if (media_type === MediaTypes.Video) {
      return <FormGroup>
        <ControlLabel> Video URL</ControlLabel>
        <FormControl value={url} onChange={(event) => this.handleChange(event.target, 'url')} />
      </FormGroup>
    } else {
      return <Upload
        accept='image/*'
        action="//jsonplaceholder.typicode.com/posts/"
        showFileList={false}
        onSuccess={(res, file) => this.handleAvatarSuccess(res, file)}
        beforeUpload={file => this.beforeAvatarUpload(file)}
      >
        {url ? this.props.children : <i className="el-icon-plus avatar-uploader-icon"></i>}
      </Upload>
    }
  }
  render() {
    const { title, date, explanation, media_type, url } = this.state.apod
    const { status } = this.props
    return (
      <Row className='show-grid'>
        <Col md={7} xs={4}>
          <FormGroup>
            <ControlLabel> Title</ControlLabel>
            <AsyncTypeahead
              options={this.state.suggestions!}
              isLoading={status === ActivityStatus.Loading}
              multiple={false}
              defaultInputValue={title}
              onChange={(value) => this.handleSelect(value)}
              labelKey={(option) => `${option.title || ''}`}
              onSearch={this.handleSearch}
              onInputChange={(value) => this.handleChange(value, 'title')}
              placeholder="Search apod from NASA..."
              filterBy={['title', 'explanation', 'date']}
            />
          </FormGroup>
          <Clearfix />
          <FormGroup>
            <ControlLabel> Date</ControlLabel>
            <FormControl value={date} onChange={(event) => this.handleChange(event.target, 'date')} />
          </FormGroup>
          <Clearfix />
          <FormGroup>
            <ControlLabel> Description</ControlLabel>
            <FormControl rows={10}
              style={{ resize: 'vertical' }}
              componentClass="textarea"
              value={explanation} onChange={(event) => this.handleChange(event.target, 'explanation')} />
          </FormGroup>
        </Col>
        <Col md={5} xs={4}>
          <FormGroup>
            <ControlLabel> Media Type</ControlLabel>
            <FormControl componentClass="select" value={media_type} onChange={(event) => this.handleChange(event.target, 'media_type')} >
              <option value={MediaTypes.Image}>Image </option>
              <option value={MediaTypes.Video}>Video</option>
              <option value={MediaTypes.Audio}>Audio</option>
            </FormControl>
          </FormGroup>
          <Clearfix />
          {this._renderElementUpload(media_type!, url!)}
        </Col>
      </Row>
    )
  }
}


const mapStateToProps = (state: IRootReducer) => ({
  ...new PropsMapper(state.nasaReducer)
})

const mapDispatchToProps = (dispatch: Dispatch<ITypedAction<any>>) => {
  return {
    onFetchSuggestion: (query: string) => new Promise((resolve, reject) => {
      dispatch({
        type: NasaTypes.FETCH_APODS,
        payload: query,
        meta: { resolve, reject }
      })
    })
  }
}
export default connect<any, any, IProps>(mapStateToProps, mapDispatchToProps)(NasaEditingModal);