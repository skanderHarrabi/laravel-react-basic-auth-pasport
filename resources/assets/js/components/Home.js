import React, { Component } from 'react';
import setAuthToken from './utils/setAuth';
import {BrowserRouter as Router , Link ,Route} from 'react-router-dom';
export default class Home extends Component {
    constructor(){
        super();
        this.state = {
            email:'',
            password:''
        }
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangeemail(e){
        this.setState({
            email : e.target.value,
            
        })
    }
    onChangePassword(e){
        this.setState({
            password : e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault();
        const user = {
            email : this.state.email,
            password : this.state.password
        }
        axios.post('/api/login',user).then(res => {
            if(res.status == 401 ){
                this.props.history.push('/register');
            }
             console.log(res.data.access_token);
             const token = res.data.access_token;
             localStorage.setItem('passportToken' , token);
             localStorage.setItem('login_logout' , 'login');
             setAuthToken(token);
             this.props.history.push('/');
        }).catch(err =>{
            console.log(err);
            this.props.history.push('/login');
        });
    }
    
    render() {
        return (
            <div className="col-md-4 justify-content-center">
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                        <label >email</label>
                        <input type="text" 
                        className="form-control" 
                        id="email" 
                        name="email"
                        defaultValue={this.state.email || ''}
                        onChange={this.onChangeemail.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                        <label >Password</label>
                        <input type="password" 
                        className="form-control" 
                        id="password" 
                        name="password"
                        defaultValue={this.state.password || ''}
                        onChange={this.onChangePassword.bind(this)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign in</button>&nbsp;
                    <Link to={`/register`} >Sign up</Link>
                </form>
            </div>
        );
    }
}

