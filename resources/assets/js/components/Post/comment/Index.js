import React, { Component } from 'react';
import {Link ,Route} from 'react-router-dom';
import Add from "./AddComment";
import List from "./ListComments";

export default class Index extends Component {
    render() {
        return (
            <div>
                    <div>
                        <Route exact path="/comment/Add" component={Add}/>
                        <Route exact path="/comments/:id" component={List}/>
                    </div>
                
            </div>
        );
    }
}

