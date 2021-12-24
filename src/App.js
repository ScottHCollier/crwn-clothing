import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";

class App extends Component {
    constructor() {
        super();

        this.state = {
            currentUser: null,
        };
    }

    unsubscribeFromAuth = null;

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userSnap = await createUserProfileDocument(userAuth);
                this.setState({
                    currentUser: {
                        id: userSnap.id,
                        ...userSnap.data(),
                    },
                });
            } else {
                this.setState({ currentUser: userAuth });
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header currentUser={this.state.currentUser} />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/signin" element={<SignInAndSignUpPage />} />
                </Routes>
            </div>
        );
    }
}

export default App;
