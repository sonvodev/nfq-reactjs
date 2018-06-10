import { INasaListing } from "../../../../models/nasa/nasa-listing.model.";
import { IPagination } from "../../../../models/pagination";
import { MouseEventHandler } from "react";

export interface IProps {
  source: INasaListing[]
  pagination: IPagination
  onDoubleClick?: MouseEventHandler<any>
  onPreviewClick?: MouseEventHandler<any>
  onDeleteClick?: MouseEventHandler<any>
}
export interface IState { }