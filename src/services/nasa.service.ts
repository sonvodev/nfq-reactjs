import { INasaParameter, NasaParameter } from "../models/nasa/nasa-parameter.model";
import { INasaListing } from "../models/nasa/nasa-listing.model";
import { BaseService } from "./base.service";
import nasaUri from "../common/uri/nasa.uri";
import { API_KEY } from "../common/constants/app.contants";
import { isNullOrUndefined } from "util";

export interface INasaService {
  filterApods?: (param: INasaParameter) => Promise<INasaListing[]>;
  createApod?: (apod: INasaListing) => Promise<string>;
  updateApod?: (apod: INasaListing) => Promise<any>;
  deleteApod?: (id: string) => Promise<any>
  fetchSuggestion?: (query: string) => any
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

  fetchSuggestion(query: string) {
    return super.select(nasaUri.Default, new NasaParameter({ api_key: API_KEY, count: 10 }))
  }

  /**
   * Validate data before save data into database
   * Case 1: Only allow valid object which is not null or undefined
   * Case 2: Only allow object title and explanation not null or undefined
   * Special case: Check if object has a specific id, it is an existed object => Call update, unless call Create
   * @param object NasaListing
   */
  saveApod(object: INasaListing) {
    if (!object) return Promise.reject('Invalid object');
    if ((isNullOrUndefined(object.title) || object.title.trim().length === 0
    ) || (isNullOrUndefined(object.explanation) || object.explanation.trim().length === 0))
      return Promise.reject('Title and explanation could not be null')

    if (object.id)
      return super.updateDoc(this._path, object.id, object)
    return super.createDoc(this._path, object)
  }

  deleteApod(id: string) {
    return id
      ? super.deleteDoc(this._path, id)
      : Promise.reject('Id is invalid')
  }

}