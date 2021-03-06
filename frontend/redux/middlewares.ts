import thunk from "redux-thunk";
import { Store, Middleware, applyMiddleware, compose } from "redux";
import { EnvName, ReduxAction } from "./interfaces";
import { Actions } from "../constants";
import { stateFetchMiddlewareConfig } from "./state_fetch_middleware";
import { revertToEnglishMiddleware } from "./revert_to_english_middleware";
import { versionChangeMiddleware } from "./version_tracker_middleware";
import { Everything } from "../interfaces";
import { refilterLogsMiddleware } from "./refilter_logs_middleware";

export interface MW extends Middleware {
  (store: Store<Everything>):
    (dispatch: Function) =>
      (action: ReduxAction<object>) => void;
}

export interface MiddlewareConfig { fn: MW; env: EnvName; }

/** To make it easier to manage all things watching the state tree,
 * we keep subscriber functions in this array. */
export const mwConfig: MiddlewareConfig[] = [
  { env: "*", fn: thunk },
  { env: "development", fn: require("redux-immutable-state-invariant").default() },
  stateFetchMiddlewareConfig,
  revertToEnglishMiddleware,
  versionChangeMiddleware,
  refilterLogsMiddleware,
];

export function getMiddleware(env: EnvName) {
  const middlewareFns = mwConfig
    .filter(function (mwc) { return (mwc.env === env) || (mwc.env === "*"); })
    .map((mwc) => mwc.fn);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wow = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const dtCompose = wow?.({
    actionsExcludelist: [
      Actions.NETWORK_EDGE_CHANGE,
      Actions.PING_NO,
      Actions.PING_OK,
      Actions.PING_START,
      Actions.RESOURCE_READY,
    ]
  });
  const composeEnhancers = dtCompose || compose;
  const middleware = applyMiddleware(...middlewareFns);

  return composeEnhancers(middleware);
}
