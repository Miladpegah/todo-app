import React from 'react';
import '../css/App.css';

class Header extends React.Component {
	state = {
		weekDay: '',
		mountDay:'',
		mount: '',
		year: '',
	};
	weekDay = new Array(7);
	monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];
  claendarStatus = false;


	componentDidMount(){
		const date = new Date();
		this.weekDay[0] = "Sunday";
		this.weekDay[1] = "Monday";
	  this.weekDay[2] = "Tuesday";
 		this.weekDay[3] = "Wednesday";
		this.weekDay[4] = "Thursday";
		this.weekDay[5] = "Friday";
		this.weekDay[6] = "Saturday";
    this.setState({
   		weekDay : this.weekDay[date.getDay()],
   		mountDay: date.getDate(),
   		mount: this.monthNames[date.getMonth()],
   		year: date.getFullYear()
    });
		
  }

  setShowStatus(event){
  	if (this.claendarStatus === true) {
  		this.claendarStatus = false;
  	}else if(this.claendarStatus === false || this.claendarStatus === null){
  		this.claendarStatus = true;
  	}
    this.props.parentCallback(this.claendarStatus);
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
         <div className="header-element">
         	<div className="ui container">
         		<div className="row">
         			<div className="col-md-12">
	         			<div>
	         				<div className="header-button-left">
	         					<button className="ui inverted button">Today</button>
	         				</div>
	         				<div className="header-button-right">
	         					<button className="ui inverted button" onClick={(event) => this.setShowStatus(event)}>
	         						{btnNote}
	         					</button>
	         				</div>
	         			</div>
	         		</div>
	         		<div className="col-md-12" style={{ paddingTop:'5%'}}>
	         				<h1>
		         				{ this.state.weekDay }, {this.state.mountDay}th
	         				</h1>
	         				<h1>
	         					{ this.state.mount } { this.state.year }
	         				</h1>
	         				
	         		</div>
         		</div>
         	</div>
         </div>

        </>
      );
  }
}

export default Header;