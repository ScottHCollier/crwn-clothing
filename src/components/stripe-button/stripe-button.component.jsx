import React from "react";
import StripeCheckout from "react-stripe-checkout";

const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
};

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey =
        "pk_test_51KaMQQK6ZC6qYDuDxn7Fxd3XG6aFjGo2Pw63XQdI3mJX7D4QjRXVh5bfbtfuLrNB20Gbwovq2MrEB3wHENwtW8IK004wS6iG58";
    return (
        <StripeCheckout
            label="Pay Now"
            name="CRWN Clothing"
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svg"
            description={`Your total is £${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
            currency="GBP"
        />
    );
};

export default StripeCheckoutButton;
