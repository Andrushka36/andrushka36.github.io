import React, { Component } from "react";

import Package from "./Package.jsx";

import "./Packages.sass";

const items = require("./../../../data/packages.json");

class Packages extends Component {
    render () {
        return (
            <section className="packages">
                {items.map((item, i) => {
                    return <Package params={item} key={`packages--${i}`}/>
                })}
            </section>
        )
    }
}

export default Packages;