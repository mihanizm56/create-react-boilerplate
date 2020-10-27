import {
  START_SUPPLIER_PAGE_LOADING,
  STOP_SUPPLIER_PAGE_LOADING,
  SET_APP_ERROR_STATE,
  REMOVE_APP_ERROR_STATE,
  STOP_APP_LOADING,
  START_APP_LOADING,
  START_I18NEXT_LOADING,
  STOP_I18NEXT_LOADING,
} from './actions';
import { IUIState } from './types';

export const initialState: IUIState = {
  appIsLoadingState: false,
  supplierPageIsLoadingState: false,
  i18nextIsLoadingState: false, // true потому что сначала надо загрузить словарь
  // и не дать отрисоваться остальному контенту
  isAppError: false,
};

type ActionsType = {
  type: string;
};

const reducer = (
  state: IUIState = initialState,
  { type }: ActionsType,
): IUIState => {
  switch (type) {
    case START_APP_LOADING:
      return { ...state, appIsLoadingState: true };
    case STOP_APP_LOADING:
      return { ...state, appIsLoadingState: false };
    case START_SUPPLIER_PAGE_LOADING:
      return { ...state, supplierPageIsLoadingState: true };
    case STOP_SUPPLIER_PAGE_LOADING:
      return { ...state, supplierPageIsLoadingState: false };
    case START_I18NEXT_LOADING:
      return { ...state, i18nextIsLoadingState: true };
    case STOP_I18NEXT_LOADING:
      return { ...state, i18nextIsLoadingState: false };
    case SET_APP_ERROR_STATE:
      return { ...state, isAppError: true };
    case REMOVE_APP_ERROR_STATE:
      return { ...state, isAppError: false };

    default:
      return state;
  }
};

export default reducer;
