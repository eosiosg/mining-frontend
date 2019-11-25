import Axios, {
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
import nicerLog from 'nicer-log'

const log = nicerLog('Axios')

function request(config: AxiosRequestConfig) {
  const promise = Axios.request(config);
  log.async(config.url || '', promise.then(returnJSON), config);
  return promise;
}

function returnJSON<T>(response: AxiosResponse<T>) {
  return response.data;
}

function sendJSON<T>(
  url: string,
  payload: {},
  method: 'POST' | 'PUT' | 'PATCH',
): Promise<T> {
  return request({
    url,
    data: payload,
    method,
  }).then(returnJSON);
}

export function postJSON<T>(
  url:string,
  payload: {},
) {
  return sendJSON<T>(url, payload,'POST');
}
export function putJSON<T> (
  url: string,
  payload: {}
) {
  return sendJSON(url, payload, 'PUT');
}

export function getJSON<T>(
  url: string,
  params: {}
): Promise<T> {
  return Axios.get(url,{
    params: params
  }).then(returnJSON);
}

export function deleteJSON<T>(
  url:string,
  data: {}
): Promise<T> {
  return Axios.delete(url,{
    data: data
  }).then(returnJSON)
}