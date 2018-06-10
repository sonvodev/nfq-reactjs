import { IRootAction } from "../root.actions"

export interface INasaAction extends IRootAction { }
export class NasaAction implements INasaAction { }

const nasaActions = new NasaAction
export default nasaActions