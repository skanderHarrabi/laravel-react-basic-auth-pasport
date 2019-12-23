import React, { Component } from 'react';
import axios from 'axios';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './errorAlert';

export default class Edit extends Component {
    constructor(props){
        super(props);
        this.state = {
            post_name:'',
            alert_message :''
        }
        this.onChangePostName = this.onChangePostName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount(){
        axios.get('/api/post/edit/'+this.props.match.params.id)
        .then(Response =>{
            this.setState({post_name : Response.data.post_name});
        });
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
        axios.put('/api/post/update/'+this.props.match.params.id,post).then(res => {
            this.setState({
                alert_message:"success"
            })
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
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
        );
    }
}

