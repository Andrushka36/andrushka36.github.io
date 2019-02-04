const ADD_POINT = 'app/route/ADD_POINT';
const REMOVE_POINT = 'app/route/REMOVE_POINT';
const REORDER_POINTS = 'app/route/REORDER_POINT';
const CHANGE_ROUTING_MODE = 'app/route/CHANGE_ROUTING_MODE';

const initialState = {
    routingMode: 'auto',
    list: [],
}

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case ADD_POINT:
            return {
                ...state,
                list: (() => {
                    const result = state.list.slice();
                    result.push(action.payload);
                    return result;
                })()
            }

        case REMOVE_POINT:
            return {
                ...state,
                list: (() => {
                    const result = state.list.slice();
                    result.splice(action.payload, 1);
                    return result;
                })()
            }

        case REORDER_POINTS:
            return {
                ...state,
                list: (() => {
                    const result = state.list.slice();
                    const {sourceIndex, destinationIndex} = action.payload;
                    const [removedPoint] = result.splice(sourceIndex, 1);
                    result.splice(destinationIndex, 0, removedPoint);
                    return result;
                })()
            }

        case CHANGE_ROUTING_MODE:
            return {
                ...state,
                routingMode: action.payload,
            }

        default:
            return state;
    }
}

export const addPoint = point => {
    return dispatch => {
        dispatch({
            type: ADD_POINT,
            payload: point,
        })
    }
}

export const removePoint = number => {
    return dispatch => {
        dispatch({
            type: REMOVE_POINT,
            payload: number,
        })
    }
}

export const reorderPoints = (sourceIndex, destinationIndex) => {
    return dispatch => {
        dispatch({
            type: REORDER_POINTS,
            payload: {sourceIndex, destinationIndex},
        })
    }
}

export const changeRoutingMode = routingMode => {
    return dispatch => {
        dispatch({
            type: CHANGE_ROUTING_MODE,
            payload: routingMode,
        })
    }
}

export const getPoints = state => {
    return state.points.list;
}

export const getRoutingMode = state => {
    return state.points.routingMode;
}

export default reducer;