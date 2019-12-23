import React, { Component } from 'react';
import axios from 'axios';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './errorAlert';

export default class Add extends Component {
    constructor(){
        super();
        this.state = {
            post_name:'',
            alert_message :''
        }
        this.onChangePostName = this.onChangePostName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangePostName(e){
        this.setState({
            post_name : e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault();
        const post = {
            post_name : this.state.post_name
        }
        axios.post('/api/post/store',post).then(res => {
            this.setState({
                alert_message:"success"
            });
            this.props.history.push('/');
        }).catch(error => {
            this.setState({
                alert_message:"error"
            })
        });
        
    }

    render() {
        return (
            <div>
                <hr />
                {this.state.alert_message == "success" ? <SuccessAlert /> : null}
                {this.state.alert_message == "error" ? <ErrorAlert /> : null}
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                        <label >Post Name</label>
                        <input type="text" 
                        className="form-control" 
                        id="Post_name" 
                        name="post_name"
                        defaultValue={this.state.post_name || ''}
                        onChange={this.onChangePostName.bind(this)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Create</button>
                </form>
            </div>
        );
    }
}

