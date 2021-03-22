import React from 'react';
import Button from '../UI/Button/Button';


const orderSummary = props => {
    const orderSum = Object.keys(props.ingredients)
        .map(igKey => {
            return (
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}: {props.ingredients[igKey]}</span>
            </li>
            )
        })
    
    return(
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients: </p>
            <ul>
                {orderSum}
            </ul>
            <p> <strong>Total Price: {props.totalPrice.toFixed(2)}$ </strong> </p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.cancellPuchasing}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continuePurchasing}>CONTINUE</Button>
        </React.Fragment>
    )
}

export default orderSummary;