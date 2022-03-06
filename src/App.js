import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from "reselect";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import Header from "./components/header/header.component";

class App extends Component {
    unsubscribeFromAuth = null;

    componentDidMount() {
        const { setCurrentUser } = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userSnap = await createUserProfileDocument(userAuth);
                setCurrentUser({
                    id: userSnap.id,
                    ...userSnap.data(),
                });
            } else {
                setCurrentUser(userAuth);
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header />
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route path="/shop/*" element={<ShopPage />} />
                    <Route exact path="/checkout" element={<CheckoutPage />} />
                    {this.props.currentUser ? (
                        <Route
                            exact
                            path="/signin"
                            element={<Navigate to="/" />}
                        />
                    ) : (
                        <Route
                            exact
                            path="/signin"
                            element={<SignInAndSignUpPage />}
                        />
                    )}
                </Routes>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
