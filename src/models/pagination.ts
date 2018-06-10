export interface IPagination {
  totalRecord?: number
  totalPage?: number
  pageIndex?: number
}
export class Pagination implements IPagination {
  totalRecord?: number
  totalPage?: number
  pageIndex?: number
  /**
   *
   */
  constructor(opt: IPagination) {
    this.totalPage = opt.totalPage;
    this.pageIndex = opt.pageIndex;
    this.totalRecord = opt.totalRecord
  }
}