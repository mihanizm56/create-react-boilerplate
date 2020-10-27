import React, { memo } from 'react';
import classnames from 'classnames/bind';
import { Text } from '@wildberries/ui-kit';
import styles from './index.module.scss';

const cn = classnames.bind(styles);

export const Page = memo(() => (
    <div data-page="home" className={cn('homePage')}>
      <Text text="hello world" size="h1" color="black" />
    </div>
  ))
