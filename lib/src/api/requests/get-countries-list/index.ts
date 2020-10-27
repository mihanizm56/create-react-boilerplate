import { JSONRPCRequest, IResponse } from '@mihanizm56/fetch-api';
import { makeRequestConfig } from './make-request-config';

export const getCountriesListRequest = (): Promise<IResponse> =>
  new JSONRPCRequest().makeRequest(makeRequestConfig());
