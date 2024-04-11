import { Route } from "react-router-dom";
import { RouteAdmin, RouteDoctor, RouteUser } from "./RouteApp";

const generatedRoute = (routes) => {
   return routes.map((route, index) => {
      return <Route index={index} path={route.path} element={route.element} />;
   });
};

export const routesUser = generatedRoute(RouteUser);
export const routesDoctor = generatedRoute(RouteAdmin);
export const routesAdmin = generatedRoute(RouteDoctor);
