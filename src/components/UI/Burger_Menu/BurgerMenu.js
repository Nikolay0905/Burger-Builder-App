import React from 'react' ;
import classes from './BurgerMenu.module.css';

const burgerMenu = props => (
    <div onClick={props.clicked} className={[classes.BurgerMenu , props.show ? classes.Show : classes.notShow].join(' ')}>
        <span className={classes.Line}></span>
        <span className={classes.Line}></span>
        <span className={classes.Line}></span>
    </div>
)
export default burgerMenu;