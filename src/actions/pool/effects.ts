import * as ActionTyps from './constants';
import {ForgeInfo} from '../../typings/api/api'
import { AppAction } from '../../typings/feature';

export const setForgeInfo = (forgeInfo: ForgeInfo): AppAction => ({
  type: ActionTyps.GET_FORGE_INFO_SUCCESS,
  data: forgeInfo
});