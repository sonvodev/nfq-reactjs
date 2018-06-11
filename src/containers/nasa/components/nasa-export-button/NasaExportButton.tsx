import * as React from 'react';
import { IProps, IState } from './NasaExportButtonPropsState';
import './NasaExportButton.scss'
const { CSVLink } = require('react-csv')
import { Glyphicon } from 'react-bootstrap'

class NasaExportButton extends React.Component<IProps, IState>{
  /**
   *
   */
  constructor(props: Readonly<IProps>) {
    super(props);
  }

  render() {
    const { data } = this.props
    return (<CSVLink data={data} className='btn btn-default'>
      <Glyphicon glyph='export' />
      {' '} Export
    </CSVLink>)
  }
}

export default NasaExportButton;