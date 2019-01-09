import React, { Component } from "react";

import Packages from "./Packages/Packages.jsx";

class App extends Component {
    render() {
        return (
            <div className="page-wrapper">
                <div className="page">
                    <h1 className="page__title">Ты сегодня покормил кота?</h1>
                    <Packages/>
                </div>
            </div>
        )
    }
}

export default App;