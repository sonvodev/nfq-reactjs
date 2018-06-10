import { INasaParameter } from "../models/nasa/nasa-parameter.model";
import { INasaListing } from "../models/nasa/nasa-listing.model.";
import { BaseService } from "./base.service";

export interface INasaService {
  filterApods?: (param: INasaParameter) => Promise<INasaListing[]>;
  createApod?: (apod: INasaListing) => Promise<string>;
  updateApod?: (apod: INasaListing) => Promise<any>;
  deleteApod?: (id: string) => Promise<any>
}

export class NasaService extends BaseService {
  /**
   *
   */
  private _path: string
  constructor(path: string) {
    super();
    this._path = path;
  }
  get path(): string {
    return this._path;
  }
  set path(value: string) {
    this._path = value
  }

  /**
   * Filter
   * @param param pageIndex and count as size of the doc
   */
  filterApods(param: INasaParameter): Promise<any> {
    return super.selectCollection<INasaListing, any>(this._path, param)
  }

}