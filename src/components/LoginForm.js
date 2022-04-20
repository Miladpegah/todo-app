import React from 'react';
import '../css/App.css';

class LoginForm extends React.Component {
	state = {};
	componentDidMount(){
    
  }
  submitForm(){
  	  const randomStr = (length) => {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
	       }
	       return result;
	    }
			let email = document.querySelector('#email').value;
			let password = document.querySelector('#password').value;
			let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			let Uppercase = /[A-Z]+/;
			let Lowercase = /[a-z]+/;
			let spacialCarecters = /[$@#&!]+/;
			let num = /[0-9]+/;
			let messages = [];

			// chack if is email
			if(!email.match(regex)){
				messages.push("Please enter a valid email");
			}

			// chack is stronger password
			if((!password.match(spacialCarecters) ||
					!password.match(Uppercase) ||
					!password.match(Lowercase) ||
					!password.match(num))
					&& 
					password != 'aW3#'
				){
				messages.push("Please make a strong password, Example: aW3#");
			}
			if(messages.length <= 0){
				let data = {
					'email': email,
					'password': password,
					'token': randomStr(100),
				};
				console.log(data);
			}else{
				let message = '';
				for(let m = 0; m < messages.length; m++){
					message = message + messages[m] + '\n';
				}
				alert(message);
			}
		}

  setShowStatus(event){
  	// if (this.claendarStatus === true) {
  	// 	this.claendarStatus = false;
  	// }else if(this.claendarStatus === false || this.claendarStatus === null){
  	// 	this.claendarStatus = true;
  	// }
   //  this.props.parentCallback(this.claendarStatus);
  }

  render(){
  	let btnNote;
  	if (this.claendarStatus === true) {
  		btnNote = "Notes";
  	}else{
  		btnNote = "Calendar";
  	}
    return(
        <>
	        <div className="container">
						<div className="row">
							<div className="col col-md-2">
							</div>
							<div className="col col-md-8">
								<form className="ui form">
								  <div className="field">
								    <label>First Name</label>
								    <input type="email" name="email" placeholder="Email" id="email"/>
								  </div>
								  <div className="field">
								    <label>Last Name</label>
								    <input type="password" name="password" placeholder="Password" id="password"/>
								  </div>
								  <button className="ui button" type="button" onClick={this.submitForm}>Submit</button>
								</form>
							</div>
							<div className="col col-md-2">
							</div>
						</div>
					</div>
        </>
      );
  }
}

export default LoginForm;