import React, { Component } from "react";

import Parser from "html-react-parser";

class Package extends Component {
    state = {
        selected: this.props.params.selected,
        hover: false
    };
    toggleSelected = () => {
        if (!this.props.params.enabled) return;

        const selected = this.state.selected;

        if (!selected) this.onMouseLeaveHandler();

        this.setState({
            selected: !selected
        });
    };
    onMouseEnterHandler = () => {
        this.setState({
            hover: true
        });
    };
    onMouseLeaveHandler = () => {
        this.setState({
            hover: false
        });
    };
    render() {
        const { filling, features, description, weight, enabled } = this.props.params;
        return (
            <article className={`package${(!enabled) ? " package_disabled" : ""}${(enabled && this.state.hover) ? " package_hover": ""}${(enabled && this.state.selected) ? " package_selected": ""}`}>
                <section
                    className="package__main"
                    onMouseEnter={this.onMouseEnterHandler}
                    onMouseLeave={this.onMouseLeaveHandler}
                    onClick={this.toggleSelected}
                >
                    <header className="package__header">
                        <div className="package__corner"/>
                        <div className="package__subtitle">
                            {
                                (enabled && this.state.selected && this.state.hover)
                                    ? "Котэ не одобряет?"
                                    : "Сказочное заморское яство"
                            }
                        </div>
                    </header>
                    <section className="package__body">
                        <h2 className="package__title">Нямушка<span className="package__filling">{filling}</span></h2>
                        <ul className="package__features">
                            {features.map((item, i) => {
                                const pattern = /(\d+)/;
                                item = item.replace(pattern, "<b>$1</b>");
                                return <li key={`package-feature-${i}`}>{Parser(item)}</li>
                            })}
                        </ul>
                        <div className="package__image">
                            <img src="images/cat.png" alt={`Нямушка ${filling}`}/>
                        </div>
                        <div className="package__weight">{weight}<span className="package__units">кг</span></div>
                    </section>
                </section>
                <footer className="package__footer">
                    {(() => {
                        if (this.state.selected) {
                            return <p>{description}</p>
                        } else if (!enabled) {
                            return <p>Печалька, {filling} закончился.</p>
                        } else {
                            return <p>Чего сидишь? Порадуй котэ, <span className="package__buy" onClick={this.toggleSelected}>купи</span>.</p>;
                        }
                    })()}
                </footer>
            </article>
        )
    }
}

export default Package;