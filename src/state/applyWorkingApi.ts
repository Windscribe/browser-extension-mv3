import type { AppDispatch } from './store'
import { setWorkingApi } from './slices/workingApi'

const applyWorkingApi = (responseApi: string, workingApi: string, dispatch: AppDispatch): void => {
  if (responseApi !== workingApi) {
    dispatch(setWorkingApi(responseApi))
  }
}

export default applyWorkingApi
