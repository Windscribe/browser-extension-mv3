import type { AppDispatch } from './store'
import { setWorkingApi } from './slices/workingApi'

const applyWorkingApi: any = (responseApi: string, workingApi: string, dispatch: AppDispatch) => {
  if (responseApi !== workingApi) {
    dispatch(setWorkingApi(responseApi))
  }
}

export default applyWorkingApi
