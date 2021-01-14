import React from 'react';
import './alert.css'

const Alert = ({color,title,message}) => {
	if(!color)
		return <></>;
	return <p className={color==='success'? 'successAlert' : 'errorAlert'}><span>{title}</span> {message}</p>;	
}

export default Alert;