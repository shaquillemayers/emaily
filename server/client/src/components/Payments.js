import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

const Payments = (props) => {
  const { handleToken } = props;

  /*   const onToken = (token) => {
    fetch("/save-stripe-token", {
      method: "POST",
      body: JSON.stringify(token),
    }).then((response) => {
      response.json().then((data) => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }; */

  return (
    <StripeCheckout
      name="Emaily"
      description="$5 for 5 email credits"
      stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
      token={(token) => handleToken(token)}
      amount={500}
      // currency="GBP"
    >
      <button className="btn blue">Add Credits</button>
    </StripeCheckout>
  );
};

export default connect(null, actions)(Payments);
