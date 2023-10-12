import chrome from './chrome'

const api = {
  ...chrome,
  // add edge specific methods;
}

export type EdgeApiAdapter = typeof api

export default api
