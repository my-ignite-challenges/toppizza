export type ProductRouteNavigationProps = {
  id?: string;
};

export type OrderRouteNavigationProps = {
  id: string;
};

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      Product: ProductRouteNavigationProps;
      Order: OrderRouteNavigationProps;
      Orders: undefined;
    }
  }
}
