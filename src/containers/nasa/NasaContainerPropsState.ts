import { INasaListing } from "../../models/nasa/nasa-listing.model.";
import { INasaParameter } from "../../models/nasa/nasa-parameter.model";

export interface IProps {
  apods?: INasaListing[]
  loadApods?: (param: INasaParameter) => any;
}
export class PropsMapper {
  /**
   *
   */
  apods?: INasaListing[]
  constructor(opt: IProps | any) {
    this.apods = opt.apods
  }
}
export interface IState {
  searchParameter: INasaParameter
}