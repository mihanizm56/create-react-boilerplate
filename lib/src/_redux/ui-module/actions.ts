import { BaseAction } from '@wildberries/redux-core-modules';

export const START_APP_LOADING = 'START_APP_LOADING';
export const startAppLoadingAction: BaseAction = () => ({
  type: START_APP_LOADING,
});

export const STOP_APP_LOADING = 'STOP_APP_LOADING';
export const stopAppLoadingAction: BaseAction = () => ({
  type: STOP_APP_LOADING,
});

export const START_SUPPLIER_PAGE_LOADING = 'START_SUPPLIER_PAGE_LOADING';
export const startSupplierPageLoadingAction: BaseAction = () => ({
  type: START_SUPPLIER_PAGE_LOADING,
});

export const STOP_SUPPLIER_PAGE_LOADING = 'STOP_SUPPLIER_PAGE_LOADING';
export const stopSupplierPageLoadingAction: BaseAction = () => ({
  type: STOP_SUPPLIER_PAGE_LOADING,
});

export const START_I18NEXT_LOADING = 'START_I18NEXT_LOADING';
export const starti18nextLoadingAction: BaseAction = () => ({
  type: START_I18NEXT_LOADING,
});

export const STOP_I18NEXT_LOADING = 'STOP_I18NEXT_LOADING';
export const stopi18nextLoadingAction: BaseAction = () => ({
  type: STOP_I18NEXT_LOADING,
});

export const SET_APP_ERROR_STATE = 'SET_APP_ERROR_STATE';
export const setAppErrorAction: BaseAction = () => ({
  type: SET_APP_ERROR_STATE,
});

export const REMOVE_APP_ERROR_STATE = 'REMOVE_APP_ERROR_STATE';
export const removeAppErrorAction: BaseAction = () => ({
  type: REMOVE_APP_ERROR_STATE,
});
