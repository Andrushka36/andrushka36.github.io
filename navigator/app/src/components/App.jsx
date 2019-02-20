import React, {Component} from "react";

import Map from "./Map/Map.jsx";
import Form from "./Form/Form.jsx";

import "./App.sass";

class App extends Component {
    render() {
        return (
            <div className="container">
                <Form/>
                <Map/>
            </div>
        )
    }
}

export default App;