import React from 'react' ;
import NavigationItem from './Navigation_Item/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = () =>(
    <div className={classes.NavigationItems}>
        <NavigationItem link="/burger" exact>Burger Builder</NavigationItem>
        <NavigationItem link="/orders" >Orders</NavigationItem>
    </div>
)

export default navigationItems;