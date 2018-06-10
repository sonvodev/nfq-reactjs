import { IApiResponse } from "../models/api-response";
import axios from "axios";
import { StoreContext } from "./index";
import { Pagination } from "../models/pagination";
import { IParameterBaseModel } from "../models/parameter.basemodel";
export class BaseService {

  protected select<TParam>(path: string, params?: TParam) {
    return axios.get(path, { params })
      .then((response: IApiResponse) => {
        return response.isSuccess
          ? Promise.resolve(response.data)
          : Promise.reject(response.error)
      })
      .catch((error: any) => {
        return Promise.reject(error)
      })
  }

  protected selectCollection<T, TParam>(colletionName: string, param: IParameterBaseModel) {
    console.log(colletionName, param)
    const collection = StoreContext.collection(colletionName)

    let size: number;
    collection.get().then(snapshot => size = snapshot.size)

    return collection
      .orderBy('updated_at')
      .startAt(param.pageIndex || 1)
      .limit(param.count || 5)
      .get()
      .then((snapshot: any) => {
        const results: T[] = []
        snapshot.forEach((doc: any) => {
          results.push({ id: doc.id, ...doc.data() })
        })
        return Promise.resolve({
          records: results,
          pagination: new Pagination({
            pageIndex: 1,
            totalPage: Math.ceil(size / param.count!),
            totalRecord: size
          })
        })
      })
      .catch((error: any) => {
        return Promise.reject(error)
      })
  }
}