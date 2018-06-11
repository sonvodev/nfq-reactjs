import { INasaListing } from "../../models/nasa/nasa-listing.model";
import { INasaParameter } from "../../models/nasa/nasa-parameter.model";
import { IPagination } from "../../models/pagination";

export interface IProps {
  apods?: INasaListing[]
  pagination?: IPagination
  loadApods?: (param: INasaParameter) => any;
  saveApod?: (apod: INasaListing) => Promise<any>
  deleteApod?: (docId: string) => Promise<any>
}
export class PropsMapper {
  /**
   *
   */
  apods?: INasaListing[]
  pagination?: IPagination

  constructor(opt: IProps | any) {
    this.apods = opt.apods
    this.pagination = opt.pagination
  }
}
export interface IState {
  searchParameter: INasaParameter
  modalVisible: boolean
  apod: INasaListing | null
  isPreviewing: boolean
}