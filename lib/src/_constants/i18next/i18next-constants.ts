import i18next from 'i18next';
import { appNamespace } from '@/_constants/i18next/app-namespace';

export const backendErrorsSubnamespace = 'backend-errors';

export const requestTranslateFunction = (
  key: string,
  options?: Record<string, any> | null,
) =>
  options
    ? i18next.t(`${appNamespace}:${backendErrorsSubnamespace}.${key}`, options)
    : i18next.t(`${appNamespace}:${backendErrorsSubnamespace}.${key}`);
