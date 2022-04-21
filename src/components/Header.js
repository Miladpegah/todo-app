import React from 'react';
import '../css/App.css';

class Header extends React.Component {
	constructor(props, ref) {
    super(props);
    this.state = {
			weekDay: '',
			mountDay:'',
			mount: '',
			year: '',
			calendarStatus: false,
		};
 		
 	}
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


	componentDidMount(){
		this.setState({
			calendarStatus: this.props.calendarStatus
		});
		// let parent_date = this.props.parentDate();
		// let date = new Date(parent_date);
		// let date = new Date(this.props.parentDate());
		let date = new Date();
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
  	document.querySelector('#calendarStatus').click();

  }

  setShowStatus(event){
  	if (this.props.calendarStatus === true) {
  		this.state.calendarStatus = false;
  	}else if(this.props.calendarStatus === false || this.props.calendarStatus === null){
  		this.state.calendarStatus = true;
  	}
    this.props.parentCallback(this.state.calendarStatus);
  }

  render(){
  	console.log('header: ' + this.props.calendarStatus);
  	let btnNote;
  	if (this.props.calendarStatus === true) {
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
	         					<button className="ui inverted button" id="calendarStatus" onClick={(event) => this.setShowStatus(event)}>
	         						{btnNote}
	         					</button>
	         				</div>
	         			</div>
	         		</div>
	         		<div className="col-md-12" id="header-date" style={{ paddingTop:'5%'}}>
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