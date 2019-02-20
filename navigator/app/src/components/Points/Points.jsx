import React, {Component} from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {connect} from "react-redux";

import {removePoint, reorderPoints, getPoints} from "./../../redux/modules/points";

import "./Points.sass";

class Points extends Component {
    letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

    removePoint = number => {
        this.props.removePoint(number);
    }

    onDragEnd = result => {
        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;

        this.props.reorderPoints(sourceIndex, destinationIndex);
    }
    
    render() {
        const points = this.props.points.map((point, i) => {
          return (typeof point === 'string') ? point : `Точка ${this.letters[i]}`;
        });

        return (
            <div className="points">
                {points.length > 0 ?
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div
                                    className="points__dnd"
                                    ref={provided.innerRef}
                                >
                                    {points.map((point, i) => {
                                        return (
                                            <Draggable
                                                key={`point-${i}`}
                                                draggableId={`item-${i}`}
                                                index={i}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        className="points__item"
                                                        key={`point-${i}`}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        {point}
                                                        <div
                                                            className="delete-point"
                                                            onClick={this.removePoint.bind(this, i)}
                                                        >
                                                            <div className="delete-point__first-line"></div>
                                                            <div className="delete-point__second-line"></div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        )
                                    })}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    : "Нет точек маршрута"
                }
            </div>        
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        points: getPoints(state),
    }
}

const mapDispatchToProps = {
    removePoint,
    reorderPoints,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Points);