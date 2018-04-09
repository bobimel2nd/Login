import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import UploadPage from './UploadPage';

var apiBaseUrl = "http://localhost:4000/api/";
const style = {
  margin: 15,
};

class Login extends Component {
	constructor(props){
		super(props);
		var localloginComponent = [];
		localloginComponent.push(
			<MuiThemeProvider>
				<div>
					<TextField
						hintText="Enter your Email Address"
						floatingLabelText = "Email Address"
						onChange={(event,newValue) => this.setState({email:newValue})}/>
					<br/>
					<TextField
						type="password"
						hintText="Enter your Password"
						floatingLabelText="Password"
						onChange={(event,newValue) => this.setState({password:newValue})}/>
					<br/>
					<RaisedButton label="Submit" 
						primary={true} 
						style={style} 
						onClick={(event) => this.handleClick(event)}/>
				</div>
			</MuiThemeProvider>
		)
		this.state = {
			email:'',
			password:'',
			loginComponent:localloginComponent,
		}
	}

	componentWillMount(){
		// console.log("willmount prop values",this.props);
		console.log("in componentWillMount");
		var localloginComponent = [];
		localloginComponent.push(
			<MuiThemeProvider>
				<div>
					<TextField
						hintText="Enter your Email Address"
						floatingLabelText="Email Address"
						onChange={(event,newValue) => this.setState({email:newValue})}/>
					<br/>
					<TextField
						type="password"
						hintText="Enter your Password"
						floatingLabelText="Password"
						onChange={(event,newValue) => this.setState({password:newValue})}/>
					<br/>
					<RaisedButton 
						label="Submit" 
						primary={true} 
						style={style} 
						onClick={(event) => this.handleClick(event)}/>
				</div>
			</MuiThemeProvider>
		)
		this.setState({loginComponent:localloginComponent})
	}

	handleClick(event){
		var self = this;
		var payload = {
			"email":this.state.email,
			"password":this.state.password
		}
		axios.post(apiBaseUrl+'login', payload)
			.then(function (response) {
				console.log(response);
				if (response.data.code === 200) {
					console.log("Login successful");
					var uploadScreen = [];
					uploadScreen.push(<UploadPage appContext={self.props.appContext}/>)
					self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
				} else if (response.data.code === 204) {
					console.log("email password do not match");
					alert(response.data.success)
				} else {
					console.log("email does not exists");
					alert("email does not exist");
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	render() {
		return (
			<div>
				<MuiThemeProvider>
				<AppBar
					title="Login"/>
				</MuiThemeProvider>
				{this.state.loginComponent}
			</div>
		);
	}
}

export default Login;
