export const getI18nextRequestEndpoint = (locale: string): string =>
  `http://i18n.suppliers-portal-eu.svc.k8s.test/I18N/registration/${locale}/i18next`;
