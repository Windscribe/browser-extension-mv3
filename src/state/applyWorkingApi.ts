import type { AppDispatch } from './store'
import { setWorkingApi } from './slices/workingApi'
import type { ApiResponse, ApiCallFunction, ObjectOrStringOrNumber } from 'api/types'

// TODO Try to make typings more concise by removing second generic parameter. Don't know how to do it yet.
export default async function <
  ExpectedResponse extends object,
  ParametersType extends ObjectOrStringOrNumber,
>(
  apiCallMethod: ApiCallFunction<ExpectedResponse, ParametersType>,
  parameters: ParametersType,
  workingApi: string,
  dispatch: AppDispatch,
): Promise<ApiResponse<ExpectedResponse>> {
  const response = await apiCallMethod(parameters, workingApi)
  if (response?.workingApi && response.workingApi !== workingApi) {
    dispatch(setWorkingApi(response.workingApi))
    delete response.workingApi
  }

  return response
}
