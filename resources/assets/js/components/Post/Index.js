import React, { Component } from 'react';
import {Link ,Route} from 'react-router-dom';
import Add from "./Add";
import List from "./List";
import Edit from "./Edit";
import comment from './comment/Index';
import ListComments from './comment/ListComments'

export default class Index extends Component {
    render() {
        return (
            <div>
                    <div>
                        <hr/>
                        <Link to="/" className="btn btn-primary">List Posts</Link>&nbsp;
                        <Link to="/post/Add/" className="btn btn-primary">Add</Link>
                        <Route exact path="/" component={List}/>
                        <Route exact path="/post/add" component={Add}/>
                        <Route exact path="/post/edit/:id" component={Edit}/>
                        <Route exact path="/comments/:id" component={comment}/>
                        <Route exact path="/comment/Add" component={comment}/>
                    </div>               
            </div>
        );
    }
}

