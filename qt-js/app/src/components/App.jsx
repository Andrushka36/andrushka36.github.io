import React, {Component} from "react";
import {connect} from "react-redux";

import Points from "./Points/Points.jsx";

import {addPoint, movePoint, getPointsCoords, getPointsNames, getMapCenter} from "./../redux/modules/points";

import "./App.sass";

class App extends Component {
    mappingRoute = () => {
        ymaps.ready(() => {
            const {pointsCoords, pointsNames, mapCenter, movePoint} = this.props;

            this.map = new ymaps.Map("map", {
                center: mapCenter,
                zoom: 12,
            });

            var myPolyline = new ymaps.GeoObject({
                geometry: {
                    type: "LineString",
                    coordinates: pointsCoords,
                }
            }, {
                strokeColor: "#00f",
                strokeWidth: 4,
            });
          
            this.map.geoObjects.add(myPolyline);

            pointsCoords.forEach((item, i) => {
                const myPlacemark = new ymaps.Placemark(item, {
                    balloonContent: pointsNames[i],
                }, {
                    draggable: true,
                    iconColor: "#f00",
                });
              
                myPlacemark.events.add("dragend", e => {
                    movePoint(i, e.originalEvent.target.geometry._coordinates);
                })

                this.map.geoObjects.add(myPlacemark);
            })
        });
    }

    componentDidMount() {
        this.mappingRoute();
    }

    componentDidUpdate() {
        document.getElementById("map").innerHTML = "";

        this.mappingRoute();
    }

    addPoint = e => {
        e.preventDefault();

        const coords = this.map.getCenter();
        const pointName = document.getElementById("input").value;

        if (!pointName) return;
    
        this.props.addPoint(coords, pointName);

        document.getElementById("input").value = "";
    }

    render() {
        return (
            <div className="container">
                <div className="aside">
                    <form className="form" onSubmit={this.addPoint}>
                        <input type="text" className="form__input" id="input"/>
                    </form>
                    <Points/>
                </div>
                <div id="map" className="map"/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        pointsCoords: getPointsCoords(state),
        pointsNames: getPointsNames(state),
        mapCenter: getMapCenter(state),
    }
}

const mapDispatchToProps = {
    addPoint,
    movePoint,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);