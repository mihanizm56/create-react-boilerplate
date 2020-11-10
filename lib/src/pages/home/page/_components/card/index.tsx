import React, { memo } from 'react';
import classnames from 'classnames/bind';
import { Text } from '@wildberries/ui-kit';
import styles from './index.module.scss';

const cn = classnames.bind(styles);

const BLOCK_NAME = 'Card';

export const Card = memo(() => (
  <div className={cn(`${BLOCK_NAME}`)}>
    <div className={cn(`${BLOCK_NAME}__text-wrapper`)}>
      <div className={cn(`${BLOCK_NAME}__text`)}>
        <Text color="black" size="h0" text="Wildberries react boilerplate" />
      </div>
      <div className={cn(`${BLOCK_NAME}__text`)}>
        <Text color="black" size="h3" text="v2.0" />
      </div>
    </div>
  </div>
));
