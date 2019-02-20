import React, {Component} from "react";
import {connect} from "react-redux";

import {getPoints, getRoutingMode} from "./../../redux/modules/points";

import "./Map.sass";

class Map extends Component {
    componentDidMount() {
        ymaps.ready(() => {
            const myMap = new ymaps.Map('map', {
                center: [55.751574, 37.573856],
                zoom: 9,
                controls: []
            });
        });
    }

    mappingRoute = () => {
        const {points, routingMode} = this.props;

        document.getElementById("map").innerHTML = '';

        const init = () => {
            const myMap = new ymaps.Map('map', {
                center: [55.751574, 37.573856],
                zoom: 9,
                controls: []
            });

            if (points.length < 1) return;

            const multiRoute = new ymaps.multiRouter.MultiRoute({
                referencePoints: points,
                params: {
                    routingMode
                }
            }, {
                boundsAutoApply: true
            });

            multiRoute.editor.start();

            myMap.geoObjects.add(multiRoute);
        }

        ymaps.ready(init);
    }

    componentDidUpdate() {
        this.mappingRoute();
    }

    render() {
        return <div id="map" className="map"/>
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        points: getPoints(state),
        routingMode: getRoutingMode(state),
    }
}

export default connect(
    mapStateToProps,
)(Map);