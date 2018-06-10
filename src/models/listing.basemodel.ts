export interface IListingBaseModel {
  id?: string
}

export class ListingBaseModel {
  /**
   *
   */
  constructor(opt: IListingBaseModel = {}) {
    Object.keys(opt).forEach(key => this[key] = opt[key])
  }
}