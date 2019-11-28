// import { getJSON } from "../fetch";
// import { processAPIResponse } from "..";
import { AccountControllerApi } from '../../typings/api/index'
export const accountCtrl = new AccountControllerApi();
// type GetHomeId = {
//   id: number;
// }
// export function getHomeData(params: GetHomeId) {
//   return processAPIResponse(getJSON('/api/hello', params))
// }