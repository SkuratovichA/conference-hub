import React, {Component} from "react";
import './styles/LogIn.css'
import axios from "axios";
// import { useNavigate } from 'react-router-dom';
//
// const navigate = useNavigate();

function Form() {
    function LoginUser(event) {
        const data = new FormData();
        data.append('username', document.getElementById('username-id').value)
        data.append('password', document.getElementById('password-id').value)

        axios( {
            method: 'post',
            url: 'http://localhost:8000/users/api/login',
            data: data
            }).then(response => {
                console.log(response.status)
                // navigate('http://localhost:3000/')
                window.location.replace('http://localhost:3000/');
            }).catch(err => {
                console.log("error:", err);
        });

        event.preventDefault()
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    }

    return(
        <form onSubmit={LoginUser}>
            <FormInput description="Username or Email"
                       placeholder="Placeholder"
                       type="text"
                       input="username"
                       id="username-id"
            />
            <FormInput description="Password"
                       placeholder="Placeholder"
                       type="password"
                       input="password"
                       id="password-id"
            />
            <FormButton title="Log in"/>
       </form>
    )
}

const FormButton = props => (
  <div id="button" className="row">
    <button>{props.title}</button>
  </div>
);

const FormInput = props => (
  <div className="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder}
           name={props.input} id={props.id} required
    />
  </div>
);

export default Form;