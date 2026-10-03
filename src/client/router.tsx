import { createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router";
import Home from "./pages/Home";
import Legal from "./pages/Legal";
import LocaleRedirect from "./pages/LocaleRedirect";
import NotFound from "./pages/NotFound";
import Room from "./pages/Room";

const rootRoute = createRootRoute({ component: Outlet, notFoundComponent: NotFound });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LocaleRedirect,
});

const englishHomeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/en",
  component: () => <Home locale="en" />,
});

const chineseHomeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/zh",
  component: () => <Home locale="zh" />,
});

const englishRoomRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/en/room/$roomId",
  component: () => {
    const { roomId } = englishRoomRoute.useParams();
    return <Room locale="en" roomId={roomId} />;
  },
  validateSearch: (search: Record<string, unknown>) => search,
});

const chineseRoomRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/zh/room/$roomId",
  component: () => {
    const { roomId } = chineseRoomRoute.useParams();
    return <Room locale="zh" roomId={roomId} />;
  },
  validateSearch: (search: Record<string, unknown>) => search,
});

const legalDocumentIds = ["privacy", "terms", "disclaimer"] as const;

const legalRoutes = legalDocumentIds.flatMap((documentId) => [
  createRoute({
    getParentRoute: () => rootRoute,
    path: `/zh/${documentId}`,
    component: () => <Legal documentId={documentId} locale="zh" />,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: `/en/${documentId}`,
    component: () => <Legal documentId={documentId} locale="en" />,
  }),
]);

const routeTree = rootRoute.addChildren([
  homeRoute,
  englishHomeRoute,
  chineseHomeRoute,
  englishRoomRoute,
  chineseRoomRoute,
  ...legalRoutes,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
