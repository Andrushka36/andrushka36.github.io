;import React, {Component} from "react";
import {connect} from "react-redux";

import {addPoint, changeRoutingMode, getPoints} from "./../../redux/modules/points";

import Points from "./../Points/Points.jsx";

import "./Form.sass";

class Form extends Component {
    state = {
        error: false,
        maxPoints: 10,
    }

    componentDidMount() {
        ymaps.ready(() => {
            new ymaps.SuggestView('input');
        });
    }

    submit = e => {
        e.preventDefault();
        
        const maxPoints = this.state.maxPoints;
        const {points, addPoint} = this.props;

        if (points.length === maxPoints) {
            this.setState({
                error: true,
            })

            setTimeout(() => {
                this.setState({
                    error: false,
                })
            }, 2000);

            return;
        }

        const newPoint = document.getElementById('input').value;

        if (newPoint) {
            document.getElementById('input').value = '';
        } else {
            return;
        }

        addPoint(newPoint);
    }

    changeRoutingMode = () => {
        const newRoutingMode = document.getElementById('routingMode').value;

        this.props.changeRoutingMode(newRoutingMode);
    }


    render() {
        const {error, maxPoints} = this.state;

        return (
            <div className="form">
                {error && <div className="form__error" id="error">Максимальное количество точек в маршруте - {maxPoints}</div>}
                <form className="form__row" onSubmit={this.submit}>
                    <input type="text" className="form__text" id="input"/>
                    <input type="submit" className="form__submit" value="Добавить точку"/>
                </form>
                <div className="form__row">
                    <div className="form__label">Тип маршрутизации:</div>
                    <select name="select" id="routingMode" className="form__select" onChange={this.changeRoutingMode}>
                        <option value="auto">на автомобиле</option>
                        <option value="masstransit">на общественном транспорте</option>
                        <option value="pedestrian">пешеходный маршрут</option>
                        <option value="bicycle">на велосипеде</option>
                    </select>
                </div>
                <Points/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        points: getPoints(state),
    }
}

const mapDispatchToProps = {
    addPoint,
    changeRoutingMode,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Form);