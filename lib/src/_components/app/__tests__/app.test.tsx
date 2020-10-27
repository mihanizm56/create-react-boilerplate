import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../index';

jest.mock('@wildberries/service-router', () => ({
  RouteNode: 'RouteNode',
  RouterProvider: 'RouterProvider',
}));

jest.mock('@/_components/root-components', () => ({
  RootComponents: 'RootComponents',
}));

const testProps: any = {
  router: jest.fn().mockName('router'),
};

describe('App component', () => {
  describe('render', () => {
    let component;

    beforeEach(() => {
      component = shallow(<App {...testProps} />);//eslint-disable-line
    });

    test('render with all props', () => {
      expect(component).toMatchSnapshot();
    });

    test('render RootComponents', () => {
      expect(component.find('RootComponents').length).toEqual(1);
    });

    test('render RouterProvider', () => {
      expect(component.find('RouterProvider').length).toEqual(1);
    });

    // must not use "error" text in test name due to cli is catching "bad" logs
    test('render RouteNode if there is no errror', () => {
      const customProps = { ...testProps, isAppNetError: false };
      const customComponent = shallow(<App {...customProps} />);//eslint-disable-line

      expect(customComponent.find('RouteNode').length).toEqual(1);
    });
  });
});
