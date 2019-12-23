import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';


export const ProtectedRoute = ({component:Component , ...rest}) => {
    return (
        <Route {...rest}  
        render={
            (props) =>{
                if(localStorage.getItem('passportToken')){
                    return <Component {...props}/>
                }else {
                    return <Redirect to={
                        {
                        pathname: "/login",
                        state: {
                            from :props.location
                        }
                        }
                    }
                    />
                }
            }
        }/>
    )
}