import React, {Component} from "react";
import './styles/LogIn.css'

class Form extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        console.log(data.get('password')); // reference by form input's `name` tag

        fetch('http://localhost:8000/users/api/login', {
            method: 'POST',
            body: data,
        });
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <FormInput description="Username or Email"
                           placeholder="Placeholder"
                           type="text"
                           input="username"
                />
                <FormInput description="Password"
                           placeholder="Placeholder"
                           type="password"
                           input="password"
                />
                <FormButton title="Log in"/>
           </form>
        )
    }
}

const FormButton = props => (
  <div id="button" class="row">
    <button>{props.title}</button>
  </div>
);

const FormInput = props => (
  <div class="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder} name={props.input} required />
  </div>
);

export default Form;