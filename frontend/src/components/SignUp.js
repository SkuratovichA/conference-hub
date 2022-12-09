import React, {Component} from "react";
import './styles/LogIn.css'
import Popup from "./Popup"

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false
        };
    };

    render() {
        return(
            <div id="signupform">
                <FormHeader title="Sign Up" />
                <div className="my-buttons">
                    <a className="btnType" role="button"
                       onClick={() => this.setState({showPopup: true})}
                    >
                        I'm a researcher
                    </a>
                    <Popup trigger={this.state.showPopup} />
                    <a className="btnType" role="button"
                       onClick={() => this.setState({showPopup: true})}
                    >
                        I'm an organization
                    </a>
                </div>
            </div>
        )
    }
}

const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
);

export default SignUp;