import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


export default class List extends Component {
    constructor(props)
     {
         super(props);
         this.state={
             Comments :[],
             authUser:[],
            }   
     }
    componentDidMount(){
        console.log(this.props.match.params.id);
        axios.get('/api/comments/'+this.props.match.params.id)
        .then(Response =>{
            console.log(Response.data[1]);
            this.setState({
                Comments : Response.data[0],
                authUser :Response.data[1]
            });
        });
    }

    onDelete(commentID){
        axios.delete('/api/comment/delete/'+commentID)
        .then(response =>{
            var comments = this.state.Comments;
            for(var i=0;i<comments.length ;i++)
            {
                if(comments[i].id == commentID)
                {
                    comments.splice(i,1);
                    this.setState({comments : comments})
                }
            }
        });
    }

    render() {
        const comentss = this.state.Comments;
        return (
            <div>
                <hr/>
                <Link to={{pathname: "/comment/Add", state: { post_id : this.props.match.params.id }}} className="btn btn-primary" >Add Comment</Link>
                <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">comment content</th>
      <th scope="col">Author</th>
      <th scope="col">Created At</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {   this.state.Comments.length == 0 ?
            <strong className="justify-content-center" >No Comments yet</strong>
        :
        this.state.Comments.map((comment,i) =>{
            return(
                <tr key={i}>
                <th scope="row">{i}</th>
                <td>{comment.content}</td>
                <td>{comment.user.name}</td>
                <td>{comment.created_at}</td>
                {
                this.state.authUser.id == comment.user_id ?
                <td>
                    <a href="#" onClick ={this.onDelete.bind(this,comment.id)} className="btn btn-danger">Delete</a>
                </td>
                : null
                }
                </tr>
            )
        })
    } 
  </tbody>
  </table>
   </div>
        );
    }
}

