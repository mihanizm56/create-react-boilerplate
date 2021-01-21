import 'fast-text-encoding/text';
/* 
    if you need some polyfills and you are not in "rus" or "euro" version
    please insert below (package is included)
    import 'react-app-polyfill/stable';
*/
import 'reset-css';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  geti18Next,
  getLocale,
  i18nextRequest,
  getI18nextRequestEndpoint,
} from '@wildberries/i18next-utils';
import i18next from 'i18next';
import { createAppStore } from '@wildberries/redux-core-modules';
import { configureRouter } from '@wildberries/service-router';
import { ABORT_REQUEST_EVENT_NAME } from '@mihanizm56/fetch-api';
import { Provider } from 'react-redux';
import {
  notificationsState,
  NOTIFICATIONS_REDUCER_NAME,
  setModalAction,
} from '@wildberries/notifications';
import {
  confirmModalModuleReducer,
  confirmModalWatcherSaga,
  CONFIRM_MODALS_REDUCER_NAME,
  CONFIRM_MODAL_SAGA_NAME,
} from '@wildberries/confirm-modal-portal';
import { App } from '@/_components/app';
import { routes } from '@/pages/routes';
import { appNamespace } from './_constants/i18next/app-namespace';
import {
  starti18nextLoadingAction,
  stopi18nextLoadingAction,
} from './_redux/ui-module';
import 'normalize.css';
import '@/styles/global.css';
import '@/styles/variables.module.scss';

const ROOT_ELEMENT = document.getElementById('root');

const router = configureRouter({
  defaultRoute: 'ui-user-profile',
  eventNameToCancelRequests: ABORT_REQUEST_EVENT_NAME,
  // uncomment if you need envs from window (for example for request endpoints)
  // enableWindowEnvsMiddleware: true,
  enablei18nMiddleware: true,
});

const store = createAppStore({
  router,
  eventNameToCancelRequests: ABORT_REQUEST_EVENT_NAME,
  rootReducers: {
    [NOTIFICATIONS_REDUCER_NAME]: notificationsState,
    [CONFIRM_MODALS_REDUCER_NAME]: confirmModalModuleReducer,
  },
  rootSagas: {
    [CONFIRM_MODAL_SAGA_NAME]: confirmModalWatcherSaga,
  },
  dependencies: { setModalAction },
});

const i18nextConfig = {
  getLocale,
  i18next,
  i18nextRequest,
  actionToStartLoading: starti18nextLoadingAction,
  actionToStopLoading: stopi18nextLoadingAction,
  createEndpoint: getI18nextRequestEndpoint,
  formatterResponseData: (data: Record<string, any>) => data.translate,
};

router.setDependencies({
  store,
  routes,
  i18nextConfig,
});

router.add(routes);

geti18Next({ appNamespace, locale: getLocale() }).then(() =>
  router.start(() => {
    ReactDOM.render(
      <Provider store={store}>
        <App router={router} />
      </Provider>,
      ROOT_ELEMENT,
    );
  }),
);
