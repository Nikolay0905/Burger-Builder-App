import React, { Component } from 'react' ;
import classes from "./Modal.module.css";
import Backdrop from '../Backdrop/Backdrop';

class modal extends Component{
    shouldComponentUpdate(nextProps ,nextState){
        return this.props.purchased !== nextProps.purchased || nextProps.children !== this.props.children;
    }

    render(){
        return(
            <React.Fragment>
                <Backdrop show={this.props.purchased} clicked={this.props.cancelPurchasingHangler}/>
                <div 
                    className={classes.Modal} 
                    style={{
                        transform: this.props.purchased ? 'translateY(0)' : "translateY(-100vh)",
                        opacity: this.props.purchased ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}


export default modal;
