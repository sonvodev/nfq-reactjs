import { IListingBaseModel, ListingBaseModel } from "../listing.basemodel";

export interface INasaListing extends IListingBaseModel {
  date?: string
  explanation?: string
  hdurl?: string
  media_type?: string
  service_version?: string
  title?: string
  url?: string
}
export class NasaListing extends ListingBaseModel implements INasaListing {
  date?: string
  explanation?: string
  hdurl?: string
  media_type?: string
  service_version?: string
  title?: string
  url?: string
  /**
   *
   */
  constructor(opt: INasaListing = {}) {
    super(opt)
  }
}