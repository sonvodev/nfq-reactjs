import { IBaseState } from "../root.state";
import { INasaListing } from "../../models/nasa/nasa-listing.model";
import { IPagination } from "../../models/pagination";

export interface INasaState extends IBaseState {
  apods?: INasaListing[];
  suggestions?: INasaListing[];
  pagination?: IPagination;
}
export class NasaState implements INasaState {
  /**
   *
   */
  apods?: INasaListing[];
  suggestions?: INasaListing[];
  pagination?: IPagination;
  constructor(opt: INasaState = {}) {
    this.apods = opt.apods || [];
    this.suggestions = opt.suggestions || [];
    this.pagination = opt.pagination || {}
  }
}