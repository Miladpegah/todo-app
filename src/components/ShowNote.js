import React from 'react';
import '../css/App.css';

class LoginForm extends React.Component {
	constructor(props, ref) {
    	super(props);
	    this.state = {
			title: null,
			content: null,
		};	   		
 	}
 	back = () => {
 		this.props.back();
 	}
	componentDidMount(){
    this.setState({
    	title: this.props.title,
    	content: this.props.content,
    })
  }

  render(){
    return(
        <>
	        <div className="container">
						<div className="row">
							<div className="col col-md-2">
							</div>
							<div className="col col-md-8">
								<h1 className="ui header">{this.state.title}</h1>
								<p>{this.state.content}</p>
								<button class="compact ui button" onClick={this.back}>
								  Back
								</button>
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