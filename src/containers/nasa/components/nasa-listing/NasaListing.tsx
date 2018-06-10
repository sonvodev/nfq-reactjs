import * as React from 'react';
import './NasaListing.scss';
import { IProps, IState } from './NasaListingPropsState';
import { INasaListing } from '../../../../models/nasa/nasa-listing.model.';
import { Table, Glyphicon } from 'react-bootstrap';
import { MediaTypes } from '../../../../common/enum';
import * as moment from 'moment';
class NasaListing extends React.Component<IProps, IState>{
  /**
   *
   */
  constructor(props: Readonly<IProps>) {
    super(props);
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

  render() {
    const { source,
      // pagination,
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
      </Table>
    );
  }
}
export default NasaListing;