import { INasaListing } from "../../../../models/nasa/nasa-listing.model";
import { ActivityStatus } from "../../../../common/enum";
import { FormEventHandler } from "react";

export interface IProps {
  entity: INasaListing
  status?: ActivityStatus
  onSelect?: (selected: any[]) => any
  onFetchSuggestion?: FormEventHandler<any>
  suggestions?: INasaListing[]
}
export interface IState {
  apod: INasaListing
  suggestions: INasaListing[]
}

export class PropsMapper {
  /**
   *
   */
  suggestions: INasaListing[]
  constructor(props: IProps | any) {
    this.suggestions = props.suggestions
  }
}