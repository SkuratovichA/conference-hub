import React, {Component} from "react";
import './styles/LogIn.css'
import Form from "./Form";

class Popup extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return(this.props.trigger) ? (
            <div id="popup" className="popup">
                <div className="popup-inner">
                    <a role="button" onClick={() => this.setState({showPopup: false})}
                    >
                        back
                    </a>
                    <Form />
                </div>
            </div>
        ) : "";
    }
}

export default Popup;
// export PopupSignUpResearcher;
// export PopupSignUpOrganization;