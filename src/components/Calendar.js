import React from 'react';
import '../css/App.css';

class Calendar extends React.Component {
	constructor(props, ref) {
      super(props);
      this.state = {
  		created_time : null,
		date : null,
      };
   		
   	}
	componentDidMount(){
		const formatDate = value => {
			let date = new Date(value);

			let month = date.getMonth();
			let year = date.getFullYear();
			let day = date.getDate();

			if (month.length < 2) 
		        month = '0' + month;
		    if (day.length < 2) 
		        day = '0' + day;

		    return [year, month, day].join('-');
		}

		this.setState({
			date: formatDate(new Date())
		});
		const calendar = document.querySelector('#app-calendar');
		const monthName = document.querySelector('#month-name');
		const previous = document.querySelector('#previous');
		const future = document.querySelector('#future');
		const dayClasses = document.querySelectorAll('#app-calendar .day');
		let year = new Date().getFullYear();
		let month = new Date().getMonth();
		let monthLong = new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(Date.UTC(year, month, 1)));

		const isWeekend = (year, month, day) => {
			// 6 when it's saturday, 0 when it's sunday
			return new Date(year, month, day).getDay() % 7 === 6 || new Date(year, month, day).getDay() % 7 === 0
		}

		const isToday = (year, month, day) => {
			let utcYear = new Date().getFullYear();
			let utcMonth = new Date().getMonth();
			let utcDay = new Date().getDate();
			let utcDate = utcYear+'.'+utcMonth+'.'+utcDay;
			let utcYear2 = new Date(year, month, day).getFullYear();
			let utcMonth2 = new Date(year, month, day).getMonth();
			let utcDay2 = new Date(year, month, day).getDate();
			let utcDate2 = utcYear2+'.'+utcMonth2+'.'+utcDay2;
			return utcDate === utcDate2;
		}

		const getDayName = (yearNum, monthNum, day) => {
			const date = new Date(Date.UTC(yearNum, monthNum, day));

			const dayName = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);

			return dayName;
		}
		const getDaysInMonthUTC = (month, year) => {
		  let date = new Date(Date.UTC(year, month, 1));
		  let days = [];
		  if(month === 12){
		  	month = 0;
		  }
		  while (date.getUTCMonth() === month) {
		    days.push(date.getDate());

		    date.setUTCDate(date.getUTCDate() + 1);
		  }
		  return days;
		}

		const showCalculation = (year, pastMonth) => {
			calendar.innerHTML = '';
			days = getDaysInMonthUTC(pastMonth, year);
		  monthLong = new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(Date.UTC(year, pastMonth, 1)));
			monthName.innerHTML = '';
			monthName.insertAdjacentHTML("beforeend",`<h1>${monthLong}<br/>${year}</h1>`);

			for (let day = 1; day <= days.length; day++){

				const weekend = isWeekend(year, pastMonth, day);
				const today = isToday(year, pastMonth, day);

				let name = '';

				if(day <= 7){
					const dayName = getDayName(year, pastMonth, day);
					name = `<div className="name">${dayName}</div>`
				}

				calendar.insertAdjacentHTML(
					"beforeend",
					`<div className='day${weekend ? " weekend" : ""}${today ? " today" : ""}'>
						${name}
						${day}
						${weekend ? "<br/><p style='color:#FFA500'>weekend</p>" : ""}
						${today ? "<h3 style='color:#9af467'>today</h3>" : ""}

					</div>`
				);
			}
		}

		const calendarCalculator = (year, month) => {
			showCalculation(year, month);
			document.querySelectorAll('#app-calendar .day').forEach(day => {
				day.addEventListener("click", event => {
					event.currentTarget.classList.toggle("selected");
				});
			});
		}

		const showSelectedDate = (element) => {
			// console.log(element);
		}

		let days = getDaysInMonthUTC(month, year);


		monthName.insertAdjacentHTML("beforeend",`<h1>${monthLong}<br/>${year}</h1>`);

		for (let day = 1; day <= days.length; day++){

			const weekend = isWeekend(year, month, day);
			const today = isToday(year, month, day);

			let name = '';

			if(day <= 7){
				const dayName = getDayName(year, month,day);
				name = `<div className="name">${dayName}</div>`
			}

			calendar.insertAdjacentHTML(
				"beforeend",
				`<div className='day${weekend ? " weekend" : ""}${today ? " today" : ""}' 
				data-year="${year}" data-month="${month}" data-day="${day}">
					${name}
					${day}
					${weekend ? "<br/><p style='color:#FFA500'>weekend</p>" : ""}
					${today ? "<h3 style='color:#9af467'>today</h3>" : ""}
				</div>`
			);
		}


		previous.addEventListener("click", () => {
			let totallMonth = month -= 1;
			let currentYear;
			if(totallMonth < 1){
				month = 12;
				totallMonth = 12;
				currentYear = year -= 1;
			}else{
				currentYear = year;
			}
			calendarCalculator(currentYear, totallMonth);
		});


		future.addEventListener("click", () => {
			let totallMonth = month += 1;
			let currentYear;
			if(totallMonth > 12){
				month = 1;
				totallMonth = 1;
				currentYear = year += 1;
			}else{
				currentYear = year;
			}
			calendarCalculator(currentYear, totallMonth);
		});
			document.querySelectorAll('#app-calendar div').forEach(day => {
				day.addEventListener("click", event => {
					event.currentTarget.classList.toggle("selected");
					let element = event.target;
					let year = element.getAttribute('data-year');
					let month = element.getAttribute('data-month');
					let day = element.getAttribute('data-day');
					let date = new Date(year + '-' + month + '-' + day);
					// let day = event.currentTarget.dataset.day;
					// let month = event.currentTarget.dataset.month;
					// let year = event.currentTarget.dataset.year;
					// let date = day + "-" + month + "-" + year;
					let result = {
						'date': date,
						'claendarStatus': false
					};
				    this.props.parentSetDate(result);
				});
				day.addEventListener("dblclick", event => {
					let element = event.target;
					let year = element.getAttribute('data-year');
					let month = element.getAttribute('data-month');
					let day = element.getAttribute('data-day');
					let date = Date(year + '-' + month + '-' + day);
					this.setState({
						date: formatDate(date)
					});
				});
			});
	}

	render(){
		return(
			<div className="root">
				<div className="clalendar-header">
					<div id="previous" className="shift"><a href="#"><h3>previous</h3></a></div>
					<div id="month-name" className="month-name"></div>
					<div id="future" className="shift"><a href="#"><h3>future</h3></a></div>
				</div>
				<div className="content">
					<div id="app-calendar"></div>
				</div>
			</div>

		);
	}
}

export default Calendar;