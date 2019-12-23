import React, { Component } from 'react';
import setAuthToken from './utils/setAuth';
import {BrowserRouter as Router , Link ,Route} from 'react-router-dom';
export default class Register extends Component {
    constructor(){
        super();
        this.state = {
            name:'',
            email:'',
            password:'',
            password_confirmation:''
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
    onChangePC(e){
        this.setState({
            password_confirmation : e.target.value
        })
    }
    onChangeName(e){
        this.setState({
            name : e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault();
        const user = {
            name : this.state.name,
            email : this.state.email,
            password : this.state.password,
            password_confirmation : this.state.password_confirmation
        }
        axios.post('/api/register',user).then(res => {
             console.log(res.data.access_token);
             this.props.history.push('/login');
            //  const token = res.data.access_token;
            //  localStorage.setItem('passportToken' , token);
            //  setAuthToken(token);
        });
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                        <label >Name</label>
                        <input type="text" 
                        className="form-control" 
                        id="name" 
                        name="name"
                        defaultValue={this.state.name || ''}
                        onChange={this.onChangeName.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                        <label >Email</label>
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
                    <div className="form-group">
                        <label >Confirme password</label>
                        <input type="password" 
                        className="form-control" 
                        id="password_confirmation" 
                        name="password_confirmation"
                        defaultValue={this.state.password_confirmation || ''}
                        onChange={this.onChangePC.bind(this)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign up</button>&nbsp;
                </form>
            </div>
        );
    }
}

