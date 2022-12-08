import React, {Component} from "react";
import './styles/LogIn.css'
import Form from './Form'

class LogIn extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return(
            <div id="loginform">
                <FormHeader title="Login" />
                <Form />
            </div>
        )
    }
}

const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
);

export default LogIn;