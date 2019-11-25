import { getJSON } from "../fetch";
import { processAPIResponse } from "..";

type GetHomeId = {
  id: number;
}
export function getHomeData(params: GetHomeId) {
  return processAPIResponse(getJSON('/api/hello', params))
}