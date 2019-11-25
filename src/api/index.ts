import { ApiStatus } from "../typings/api/apistatus";


export async function processAPIResponse<D> (
  response: Promise<D & { status: ApiStatus }>
){
  const result = await response;
  if (result.status == "ok") return result
  if (result.status == "error") alert('api error')
}