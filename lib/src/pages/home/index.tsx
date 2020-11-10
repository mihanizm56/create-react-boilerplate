import React from 'react';
import { RouteNode } from '@wildberries/service-router';
import { injectAsyncReducer } from '@wildberries/redux-core-modules';
import { AppLayout } from '@/_layouts/app-layout';
import reducerUI, {
  MODULE_REDUCER_NAME as reducerUIName,
} from '@/_redux/ui-module';
import { Page } from './page';

const pageNode = 'home';

const action = async ({ store }) => {
  injectAsyncReducer({
    store,
    name: reducerUIName,
    reducer: reducerUI,
  });

  return {
    // uncomment if you need translations
    // i18n: {
    //   namespaces: [appNamespace],
    // },
    title: 'Home',
    content: (
      <AppLayout>
        <RouteNode nodeName={pageNode}>
          {({ route, content }) => {
            if (route.name === pageNode) {
              return <Page />;
            }

            return content;
          }}
        </RouteNode>
      </AppLayout>
    ),
  };
};

export default action;
