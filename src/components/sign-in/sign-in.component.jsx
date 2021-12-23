import React, { Component } from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./sign-in.styles.scss";

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = { email: "", password: "" };
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({ email: "", password: "" });
    };

    handleChange = (e) => {
        const { value, name } = e.target;

        this.setState({ [name]: value });
    };

    render() {
        return (
            <div className="sign-in">
                <h2 className="title">I already have an account</h2>
                <span>Sign in the your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        handleChange={this.handleChange}
                        name="email"
                        type="email"
                        label="Email"
                        value={this.state.email}
                        required
                    ></FormInput>
                    <FormInput
                        handleChange={this.handleChange}
                        name="password"
                        type="password"
                        value={this.state.password}
                        label="Password"
                        required
                    ></FormInput>
                    <CustomButton type="submit">Sign In</CustomButton>
                </form>
            </div>
        );
    }
}

export default SignIn;
