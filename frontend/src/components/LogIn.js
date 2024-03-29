// author: Shchapaniak Andrei

import React, {useContext} from "react";
import AuthContext from "../context/AuthContext";

import './styles/LogIn.css'

const LogIn = () => {
    let {loginUser} = useContext(AuthContext)

    return (
        <div id="loginform">
            <form onSubmit={loginUser} style={{ marginBottom: "25px" }}>
                <FormHeader title="Login"/>
                <FormInput description="Username or Email"
                           placeholder="Username or Email"
                           type="text"
                           input="username"
                           id="username-id"
                />
                <FormInput description="Password"
                           placeholder="Password"
                           type="password"
                           input="password"
                           id="password-id"
                />
                <FormButton title="Log in"/>
            </form>
        </div>
    )
}

const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
);

const FormButton = props => (
    <div id="button" className="row-login">
        <button>{props.title}</button>
    </div>
);

const FormInput = props => (
    <div className="row-login" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <label>{props.description}</label>
        <input type={props.type} placeholder={props.placeholder}
               name={props.input} id={props.id}
               required
        />
    </div>
);

export default LogIn;