import React, { Component } from 'react';
import axios from 'axios';

export default class Add extends Component {
    constructor(){
        super();
        this.state = {
            content:'',
            alert_message :'',
            post_id : null
        }
        this.onChangePostName = this.onChangePostName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount(){
        this.setState({post_id : this.props.location.state.post_id});
    }
    onChangePostName(e){
        this.setState({
            content : e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault();
        const comment = {
            content : this.state.content
        }
        axios.post('/api/comments/'+this.state.post_id,comment).then(res => {
            this.props.history.push('/comments/'+this.state.post_id);
        });
        
    }

    render() {
        return (
            <div>
                <hr />
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                        <label >Comment Content</label>
                        <input type="text" 
                        className="form-control" 
                        id="content" 
                        name="content"
                        defaultValue={this.state.content || ''}
                        onChange={this.onChangePostName.bind(this)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Create</button>
                </form>
            </div>
        );
    }
}

