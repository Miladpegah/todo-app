import React from 'react';
import { saveAs } from 'file-saver';
import '../css/App.css';

class AddTodo extends React.Component{
	state = {
		id: '',
		title: '',
		content: '',
		checked: '',
		date: '',
	};
	date = [];
	componentDidMount(){
		const formSubmit = document.querySelector('#formSubmit');
		const addTodoForm = document.querySelector('#addTodoForm');
		
		const formSubmitEvent = () => {
			let information = {
				id: this.state.id,
				title: this.state.title,
				contentkey: this.state.content,
				checkedkey: this.state.checked,
				datekey: this.state.date,
			};
			this.date.push(information);
			formSubmit.className='ui black button';
		};


		formSubmit.addEventListener('click', () => {
			formSubmit.className='ui secondary loading button';
			this.setState({checked: false});
			this.setState({date: new Date()});
			formSubmitEvent();

		});


	}

	handleTitleChange = (e) => {
		this.setState({title: e.target.value});
	}
	handleContentChange = (e) => {
		this.setState({content: e.target.value});
	}

	render() {
		return (
			<>
				<div className="container">
					<div className="row">
						<div className="col col-md-2">
						</div>
						<div className="col col-md-8">
							<div className="ui form" id="addTodoForm">
							  <div className="field">
							    <label>Title</label>
							    <input type="text" name="Title" id="formTitle" placeholder="Title" onChange={this.handleTitleChange}/>
							  </div>
							  <div class="field">
							    <label>Content</label>
							    <textarea className="Content" id="formContent" rows="3" placeholder="Write here your todo details" onChange={this.handleContentChange}></textarea>
							  </div>
							  <button className="ui black button" id="formSubmit" type="submit">Add</button>
							</div>
						</div>
						<div className="col col-md-2">
						</div>
					</div>
				</div>
			</>
			);
	}
}

export default AddTodo;