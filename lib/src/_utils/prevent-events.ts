import { SyntheticEvent } from 'react';

export const preventDefaultEvent = (event: SyntheticEvent<any>) =>
  event.preventDefault();
  
export const preventEventPropagation = (event: SyntheticEvent<any>) =>
  event.stopPropagation();