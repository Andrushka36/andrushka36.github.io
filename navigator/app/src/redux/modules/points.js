const ADD_POINT = "app/route/ADD_POINT";
const REMOVE_POINT = "app/route/REMOVE_POINT";
const REORDER_POINTS = "app/route/REORDER_POINTS";
const MOVE_POINT = "app/route/MOVE_POINT";

const initialState = {
    pointsCoords: [],
    pointsNames: [],
    mapCenter: [55.599574, 38.123856],
}

const reducer = (state = initialState, action = {}) => {
    const {pointsCoords, pointsNames} = state;
    switch (action.type) {
        case ADD_POINT:
            const {coords, name} = action.payload;
            return {
                ...state,
                pointsCoords: (() => {
                    const result = pointsCoords.slice();
                    result.push(coords);
                    return result;
                })(),
                pointsNames: (() => {
                    const result = pointsNames.slice();
                    result.push(name);
                    return result;
                })(),
                mapCenter: coords,
            }

        case REMOVE_POINT:
            return {
                ...state,
                pointsCoords: (() => {
                    const result = pointsCoords.slice();
                    result.splice(action.payload, 1);
                    return result;
                })(),
                pointsNames: (() => {
                    const result = pointsNames.slice();
                    result.splice(action.payload, 1);
                    return result;
                })(),
                mapCenter: (() => {
                    const index = (action.payload === pointsCoords.length - 1) ? pointsCoords.length - 2 : pointsCoords.length - 1;
                    return pointsCoords[index] || initialState.mapCenter;
                })(),
            }

        case REORDER_POINTS:
            return {
                ...state,
                pointsCoords: (() => {
                    const result = pointsCoords.slice();
                    const {sourceIndex, destinationIndex} = action.payload;
                    const [removedPoint] = result.splice(sourceIndex, 1);
                    result.splice(destinationIndex, 0, removedPoint);
                    return result;
                })(),
                pointsNames: (() => {
                    const result = pointsNames.slice();
                    const {sourceIndex, destinationIndex} = action.payload;
                    const [removedPoint] = result.splice(sourceIndex, 1);
                    result.splice(destinationIndex, 0, removedPoint);
                    return result;
                })(),
            }

        case MOVE_POINT:
            const {number, newCoords} = action.payload;
            return {
                ...state,
                pointsCoords: (() => {
                    const result = pointsCoords.slice();
                    result[number] = newCoords;
                    return result;
                })(),
                mapCenter: newCoords,
            }

        default:
            return state;
    }
}

export const addPoint = (coords, name) => {
    return dispatch => {
        dispatch({
            type: ADD_POINT,
            payload: {coords, name},
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

export const movePoint = (number, newCoords) => {
    return dispatch => {
        dispatch({
            type: MOVE_POINT,
            payload: {number, newCoords},
        })
    }
}

export const getPointsCoords = state => {
    return state.points.pointsCoords;
}

export const getPointsNames = state => {
    return state.points.pointsNames;
}

export const getMapCenter = state => {
    return state.points.mapCenter;
}

export default reducer;