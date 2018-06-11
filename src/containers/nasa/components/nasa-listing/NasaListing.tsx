import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './NasaListing.scss';
import { IProps, IState } from './NasaListingPropsState';
import { INasaListing } from '../../../../models/nasa/nasa-listing.model';
import { Table, Glyphicon, FormGroup, FormControl } from 'react-bootstrap';
import { MediaTypes } from '../../../../common/enum';
import * as moment from 'moment';
import { PaginationComponent } from '../../../../components'
class NasaListing extends React.Component<IProps, IState>{
  /**
   *
   */
  constructor(props: Readonly<IProps>) {
    super(props);
    this.state = {
      param: props.param!
    }
  }
  _renderIconByMediaType(media_type?: string) {
    if (media_type === MediaTypes.Image) {
      return <Glyphicon glyph='picture' />
    } else if (media_type === MediaTypes.Video) {
      return <Glyphicon glyph='facetime-video' />
    } else {
      return <Glyphicon glyph='facetime-play' />
    }
  }

  handleChangeCount(event: any) {
    const value = (ReactDOM.findDOMNode(event.target) as any).value
    const { param } = this.state
    param.count = parseInt(value)
    this.setState({ ...this.state, param });
    this.props.fetchData!(param);
  }
  handleChangePageIndex(value: number) {
    const { param } = this.state
    param.pageIndex = value
    this.setState({ ...this.state, param });
    this.props.fetchData!(param);
  }
  render() {
    const { source,
      pagination,
      param,
      onDeleteClick,
      onDoubleClick,
      onPreviewClick
    } = this.props
    return (
      <Table striped={true} condensed={true} hover={true} responsive={true}>
        <thead>
          <tr>
            <th style={{ width: '20%' }}>Title</th>
            <th style={{ width: '45%' }}>Description</th>
            <th style={{ width: '15%' }}>Date Created</th>
            <th style={{ width: '10%' }}>Preview</th>
            <th style={{ width: '10%' }}>Download</th>
          </tr>
        </thead>
        <tbody>
          {
            source.map((apod: INasaListing, index: number) => <tr key={index}
              onDoubleClick={onDoubleClick!.bind(this, apod)}>
              <td style={{ verticalAlign: 'middle' }}>{apod.title}</td>
              <td style={{ textJustify: 'inter-word', textAlign: 'justify' }}>{apod.explanation}</td>
              <td style={{ verticalAlign: 'middle' }}>{moment(apod.date).format('ll')}</td>
              <td style={{ verticalAlign: 'middle' }}>
                <a href="javascript:void(0);" onClick={onPreviewClick!.bind(this, apod)}>
                  {this._renderIconByMediaType(apod.media_type)}
                </a>
              </td>
              <td style={{ verticalAlign: 'middle' }}><a href={apod.url} >Download</a></td>
              <td style={{ verticalAlign: 'middle' }}>
                <a href='javascript:void(0);' onClick={onDeleteClick!.bind(this, apod)} className='text-danger' >
                  <Glyphicon glyph='remove' />
                </a>
              </td>
            </tr>)
          }
        </tbody>
        <tfoot>
          <tr>
            <th className='text-left' colSpan={4}>
              <PaginationComponent pagination={pagination} onChange={this.handleChangePageIndex.bind(this)} />
            </th>
            <th className='text-right' colSpan={2}>
              <FormGroup controlId="formControlsSelect">
                <FormControl componentClass="select" placeholder="select" onChange={this.handleChangeCount.bind(this)} value={param!.count}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </FormControl>
              </FormGroup>
            </th>
          </tr>
        </tfoot>
      </Table>

    );
  }
}
export default NasaListing;