import { IAdvancedRoute } from '@wildberries/service-router';

type ParamsType = {
  routes: Array<IAdvancedRoute>;
  routeName: string;
};

export const findRouteObject = ({
  routes,
  routeName,
}: ParamsType): IAdvancedRoute | null => {
  let result = null;
  const splittedRouteName = routeName.split('.');
  const maxRouteNameDepth =
    splittedRouteName.length > 0 ? splittedRouteName.length - 1 : 0;

  const recursiveRoutesSearch = ({ findRoutes, depth }) => {
    const routePartialName = splittedRouteName[depth];

    if (!routePartialName || depth > maxRouteNameDepth) {
      return;
    }

    findRoutes.forEach(route => {
      if (route.name === routePartialName) {
        if (route.children) {
          recursiveRoutesSearch({
            findRoutes: route.children,
            depth: depth + 1,
          });
        } else if (depth === maxRouteNameDepth) {
          result = route;
        }
      }
    });
  };

  recursiveRoutesSearch({
    findRoutes: routes,
    depth: 0,
  });

  return result;
};
