import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Pagination from 'react-js-pagination';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './errorAlert';

export default class List extends Component {
    constructor()
     {
         super();
         this.state={
             posts :[],
             authUser:[],
             activePage:1,
            itemsCountPerPage:1,
            totalItemsCount:1,
            pageRangeDisplayed:3,
            alert_message :''
            }   
        this.handlePageChange =this.handlePageChange.bind(this);    
     }

    componentDidMount(){
        axios.get('/api/posts')
        .then(Response =>{
            console.log(Response.data[0]);
            this.setState({
                authUser : Response.data[1],
                posts : Response.data[0].data,
                itemsCountPerPage:Response.data[0].per_page,
                totalItemsCount:Response.data[0].total,
                activePage:Response.data[0].current_page
            });
        });
    }

    onDelete(PostId){
        axios.delete('/api/post/delete/'+PostId)
        .then(response =>{
            var postes = this.state.posts;
            for(var i=0;i<postes.length;i++)
            {
                if(postes[i].id == PostId)
                {
                    postes.splice(i,1);
                    this.setState({postes : postes})
                }
            }
            this.setState({
                alert_message:"success"
            })
        }).catch(error => {
            this.setState({
                alert_message:"error"
            })
        });
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        // this.setState({activePage: pageNumber});
        axios.get('/api/posts?page='+pageNumber)
        .then(Response =>{
            this.setState({
                posts : Response.data[0].data,
                itemsCountPerPage:Response.data[0].per_page,
                totalItemsCount:Response.data[0].total,
                activePage:Response.data[0].current_page
            });
            
            
        });
      }

    render() {
        return (
            <div>
                {this.state.alert_message == "success" ? <SuccessAlert /> : null}
                {this.state.alert_message == "error" ? <ErrorAlert /> : null}
                <hr />
                <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Post Name</th>
      <th scope="col">Author</th>
      <th scope="col">Created At</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {   
        this.state.posts.length == 0 ?
        <strong className="justify-content-center" >No Posts yet</strong>
        :
        this.state.posts.map((post,i) =>{
            return(
                <tr key={i}>
                <th scope="row">{i}</th>
                <td>{post.post_name}</td>
                <td>{post.user.name}</td>
                <td>{post.created_at}</td>
                {
                this.state.authUser.id == post.user_id ?
                <td>
                    <Link to={`/post/edit/${post.id}`} className="btn btn-warning mr-3">Edit</Link>
                    <Link to={`/comments/${post.id}`} className="btn btn-primary mr-3">comments</Link>
                    <a href="#" onClick ={this.onDelete.bind(this,post.id)} className="btn btn-danger">Delete</a>
                </td>
                :   <Link to={`/comments/${post.id}`} className="btn btn-primary">comments</Link>
                }

                </tr>
            )
        })
    }
  </tbody>
  </table>
   <div className="d-flex justify-content-center">   
        <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.itemsCountPerPage}
            totalItemsCount={this.state.totalItemsCount}
            pageRangeDisplayed={this.state.pageRangeDisplayed}
            onChange={this.handlePageChange}
            itemClass= 'page-item'
            linkClass= 'page-link'
        />
   </div>

   </div>
        );
    }
}

