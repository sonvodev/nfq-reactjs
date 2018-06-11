import { INasaListing } from "../../../../models/nasa/nasa-listing.model";
import { IPagination } from "../../../../models/pagination";
import { MouseEventHandler } from "react";
import { INasaParameter } from "../../../../models/nasa/nasa-parameter.model";

export interface IProps {
  source: INasaListing[]
  param?: INasaParameter
  pagination: IPagination
  onDoubleClick?: MouseEventHandler<any>
  onPreviewClick?: MouseEventHandler<any>
  onDeleteClick?: MouseEventHandler<any>
  fetchData?: (param: INasaParameter) => void
}
export interface IState {
  param: INasaParameter
}