import React,{useEffect,useState,Fragment} from 'react';
import styles from './Button.module.css'

const Button = ({children,onClick,buttonClass}) => {

    return(
        <button className={buttonClass?buttonClass:styles.default}>
            {children}
        </button>
    )
}
export default Button
