import React, { Component } from 'react';
import {Link,Route ,withRouter} from 'react-router-dom';
import Home from './Home';
import About from './About';
import Post from './Post/Index';
import Register from './Register';
import setAuthToken from './utils/setAuth';
import { ProtectedRoute } from './protectedRoute';


class Header extends Component {

    constructor(props)
     {
         super();
         this.state={
             login_logout:'',
             path:''
            }   
        this. logout = this.logout.bind(this);  
     }

     componentDidMount(){
        if(localStorage.getItem('passportToken')){
            this.setState({
                login_logout:'logout',
                path:'logout'
            })
        }else {
            this.setState({
                login_logout:'login',
                path:'login'
            })
        }
        
    }
    logout(){
        if(this.state.login_logout == 'logout'){
             axios.post('/api/logout')
        .then(response =>{ 
            this.setState({
                login_logout :'login',
                path:'login'
            })
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('passportToken');
            this.props.history.push('/');
        });
        }
    }

    render() {
        return (
            
            <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    </ul>
                    
                      <Link onClick ={this.logout.bind(this)} className="nav-link my-2 my-lg-0" to={this.state.path}>{this.state.login_logout}</Link>
                   
                      {/* <Link className="nav-link my-2 my-lg-0" to="/login">Login</Link> */}
                    
                 </div>
            </nav>
            <div className="row">
                <div className="col-md-12">
                    <Route exact path='/login' component = {Home}/>
                    <Route exact path='/register' component = {Register}/>
                    <ProtectedRoute exact path='/' component = {Post}/>
                    <ProtectedRoute exact path="/post/add" component={Post}/>
                    <ProtectedRoute exact path="/post/edit/:id" component={Post}/>
                    <ProtectedRoute exact path="/comments/:id" component={Post}/>
                    <ProtectedRoute exact path="/comment/Add" component={Post}/>
                </div>
            </div>
            </div>

        );
    }
}

export default withRouter(Header);