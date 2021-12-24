import React, { Component } from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { signInWithGoogle, auth } from "../../firebase/firebase.utils";
import { signInWithEmailAndPassword } from "firebase/auth";

import "./sign-in.styles.scss";

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = { email: "", password: "" };
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = this.state;

        try {
            await signInWithEmailAndPassword(auth, email, password);

            this.setState({
                email: "",
                password: "",
            });
        } catch (error) {
            console.log("Error logging in", error.message);
        }
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
                    <div className="buttons">
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton
                            type="button"
                            onClick={signInWithGoogle}
                            isGoogleSignIn
                        >
                            Sign in with Google
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;
