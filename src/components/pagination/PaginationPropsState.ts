import { IPagination } from "../../models/pagination";
import { MouseEventHandler } from "react";

export interface IProps {
  pagination: IPagination
  onChange?: MouseEventHandler<any>
}
export interface IState { }