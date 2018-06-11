import { MouseEventHandler } from "react";

export interface IProps {
  show?: boolean
  showHeader?: boolean
  title?: string
  onClose?: MouseEventHandler<any>
  onSave?: MouseEventHandler<any>
}
export interface IState { }