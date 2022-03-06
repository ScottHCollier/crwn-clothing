import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useNavigate } from "react-router-dom";

import CartItem from "../cart-item/cart-item.component";

import {
    CartDropdownContainer,
    CartDropdownButton,
    EmptyMessageContainer,
    CartItemsContainer,
} from "./cart-dropdown.styles";

import { selectCartItems } from "../../redux/cart/cart.selectors";

const CartDropdown = ({ cartItems }) => {
    const navigate = useNavigate();
    return (
        <CartDropdownContainer>
            {cartItems.length ? (
                <CartItemsContainer>
                    {cartItems.map((cartItem) => (
                        <CartItem key={cartItem.id} item={cartItem} />
                    ))}
                </CartItemsContainer>
            ) : (
                <EmptyMessageContainer>
                    Your cart is empty
                </EmptyMessageContainer>
            )}
            <CartDropdownButton onClick={() => navigate("/checkout")}>
                GO TO CHECKOUT
            </CartDropdownButton>
        </CartDropdownContainer>
    );
};

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
});

export default connect(mapStateToProps)(CartDropdown);
