import { countriesEndpoint } from '@/api/endpoints/suppliers';
import { requestTranslateFunction } from '@/_constants/i18next/i18next-constants';
import { responseSchema } from './response-schema';

export const makeRequestConfig = () => ({
  endpoint: countriesEndpoint,
  translateFunction: requestTranslateFunction,
  responseSchema,
  headers: {
    'X-User-Id': '2',
  },
});
