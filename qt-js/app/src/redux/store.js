import {applyMiddleware, createStore, compose} from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";

const middleware = compose(applyMiddleware(thunk));

export default createStore(reducers, middleware);