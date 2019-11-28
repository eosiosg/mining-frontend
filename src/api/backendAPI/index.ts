// import { getJSON } from "../fetch";
// import { processAPIResponse } from "..";

// type GetHomeId = {
//   id: number;
// }
// export function getHomeData(params: GetHomeId) {
//   return processAPIResponse(getJSON('/api/hello', params))
// }

import { 
  AccountControllerApi,
  PoolControllerApi
} from '../../typings/api'
export const accountCtrl = new AccountControllerApi();
export const poolCtrl = new PoolControllerApi();