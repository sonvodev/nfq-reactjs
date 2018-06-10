import { IBaseState } from "../root.state";
import { INasaListing } from "../../models/nasa/nasa-listing.model.";
import { IPagination } from "../../models/pagination";

export interface INasaState extends IBaseState {
  apods?: INasaListing[];
  pagination?: IPagination;
}
export class NasaState implements INasaState {
  /**
   *
   */
  apods?: INasaListing[];
  pagination?: IPagination;
  constructor(opt: INasaState = {}) {
    this.apods = opt.apods || [];
    this.pagination = opt.pagination || {}
  }
}