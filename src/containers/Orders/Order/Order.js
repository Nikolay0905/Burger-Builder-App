import React from 'react';
import classes from './Order.module.css'; 

const order = props => (
    <div className={classes.Order}>
        <p>Ingredients: {Object.keys(props.ingredients).map(ig => (<span style={{display:'inline-block' , margin: '0 8px' , padding:'5px' , border:'1px solid #ccc'}}>{ig} : {props.ingredients[ig]}</span>))}</p>
        <p>Price : <strong>USD {props.price}</strong></p>
    </div>
)


export default order;