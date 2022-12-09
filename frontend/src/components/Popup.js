import React, {Component} from "react";
import './styles/LogIn.css'

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
                </div>
            </div>
        ) : "";
    }
}

export default Popup;
// export PopupSignUpResearcher;
// export PopupSignUpOrganization;