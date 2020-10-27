import React, { Props } from 'react';
import { InitialAppPreloader, Text } from '@wildberries/ui-kit';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import {
  getAppIsLoading,
  getIsAppError,
  geti18nextIsLoading,
} from '@/_redux/ui-module';
import styles from './index.module.scss';

const BLOCK_NAME = 'App-layout';
const cn = classnames.bind(styles);

type PropsType = {
  isAppLoading: boolean;
  nodeName: string;
  isAppError: boolean;
  i18nextLoading: boolean;
} & Props<any>;

const WrappedViewComponent = ({
  isAppLoading,
  children,
  isAppError,
  i18nextLoading,
}: PropsType) => {
  if (isAppError) {
    return (
      <Text
        color="black"
        size="h1"
        text="Приносим извинения, в приложении произошла ошибка"
      />
    );
  }

  if (i18nextLoading) {
    return <InitialAppPreloader viewBox="25 25 50 50" />;
  }

  return (
    <div className={cn(BLOCK_NAME)}>
      <div
        className={cn(`${BLOCK_NAME}__components`, {
          [`${BLOCK_NAME}__components--hidden`]: isAppLoading,
        })}
      >
        {children}
      </div>

      {isAppLoading && <InitialAppPreloader viewBox="25 25 50 50" />}
    </div>
  );
};

const mapStateToProps = state => ({
  isAppError: getIsAppError(state),
  isAppLoading: getAppIsLoading(state),
  i18nextLoading: geti18nextIsLoading(state),
});

export const AppLayout = connect(mapStateToProps)(WrappedViewComponent);
