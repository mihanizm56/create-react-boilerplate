import { MODULE_REDUCER_NAME } from './constants';

export interface IUIState {
  appIsLoadingState: boolean;
  supplierPageIsLoadingState: boolean;
  i18nextIsLoadingState: boolean;
  isAppError: boolean;
}

export interface IUIStatePart {
  [MODULE_REDUCER_NAME]: IUIState;
}
