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
            totalPage: Math.ceil(size / (param.count! || 5)),
            totalRecord: size
          })
        })
      })
      .catch((error: any) => {
        return Promise.reject(error)
      })
  }

  protected createDoc<T>(colletionName: string, object: any) {
    const timestamp = new Date
    const destination = { created_at: timestamp, updated_at: timestamp }
    Object.keys(object).forEach(key => destination[key] = object[key])

    return StoreContext.collection(colletionName)
      .add(destination)
      .then((docRef: any) => {
        return Promise.resolve(`Object [${docRef.id}] has been created successfully`)
      })
      .catch((error: any) => {
        console.log(error)
        return Promise.reject(error)
      })

  }
  protected updateDoc<T>(colletionName: string, docId: string, object: T) {

    const timestamp = new Date
    const destination = {}
    Object.keys(object).forEach(key => destination[key] = object[key])
    destination['updated_at'] = timestamp

    return StoreContext.collection(colletionName)
      .doc(docId)
      .set(object)
      .then((snapshot: any) => {
        return Promise.resolve(`Object [${docId}] has been updated successfully`)
      })
      .catch((error: any) => {
        return Promise.reject(error)
      })
  }

  protected deleteDoc(collectionName: string, docId: string) {
    return StoreContext.collection(collectionName)
      .doc(docId)
      .delete()
      .then(() => {
        return Promise.resolve(`Object [${docId}] has been deleted successfully`)
      })
      .catch(error => Promise.reject(error))
  }
}