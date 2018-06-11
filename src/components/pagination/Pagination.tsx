import * as React from 'react'
import './Pagination.scss'
import { IProps, IState } from './PaginationPropsState'
import { Pagination } from 'react-bootstrap'
class PaginationComponent extends React.Component<IProps, IState>{

  /**
   *
   */
  constructor(props: Readonly<IProps>) {
    super(props);

  }
  _renderPage(number: number, index: number, pageIndex: number = 1) {
    const { onChange } = this.props
    return <Pagination.Item key={index} active={number === pageIndex} onClick={onChange!.bind(this, number)}>{number}</Pagination.Item>
  }
  render() {
    const { pagination } = this.props
    const pages: number[] = [];
    if (pagination.totalPage && pagination.totalPage > 0) {
      for (let i = 1; i <= pagination.totalPage; i++) {
        pages.push(i)
      }
    }
    return <Pagination bsSize="small">{
      pages.map((number, index) => this._renderPage(number, index, pagination.pageIndex))
    }</Pagination>
  }
}

export default PaginationComponent;