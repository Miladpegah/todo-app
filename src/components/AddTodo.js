import React from 'react';
import { saveAs } from 'file-saver';
import '../css/App.css';

class AddTodo extends React.Component{
	state = {
		data: null,
	};
	date = [];
	componentWillMount(){
		this.setState({
			data:[
				{
					id: 1,
					title: 'number one',
					content: 'jf kdsjfskj fs',
					checked: false,
					date: '',
				},
				{
					id: 2,
					title: 'number one',
					content: 'jf kdsjfskj fs',
					checked: false,
					date: '',
				},
				{
					id: 3,
					title: 'number one',
					content: 'jf kdsjfskj fs',
					checked: false,
					date: '',
				},
				{
					id: 4,
					title: 'number one',
					content: 'jf kdsjfskj fs',
					checked: false,
					date: '',
				},
				{
					id: 5,
					title: 'number one',
					content: 'jf kdsjfskj fs',
					checked: false,
					date: '',
				},
			]
		});
	}
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
		const editTodo = (event) => {
			alert(event);
		}

		let cards = '';
		this.state.data.map((data, d) => {
			let card = `
			<div class="col-md-12">
				<div class="ui card d-inline-block w-100" id="todo_card_` + data.id +`">
				  <div class="content">
				    <i class="right floated edit icon edit-icon" style="cursor:pointer" ></i>
				    <div class="header">Cute Dog</div>
				    <div class="description">
				      <p>
				      	lorem ipsum
				      </p>
				    </div>
				  </div>
				  <div class="extra content">
				    <span class="left floated">
				      <i class="trash icon remove-todo" style="cursor:pointer"></i>
				    </span>
				    <span class="right floated" data-inverted="" data-tooltip="Done" data-position="right center">
				      	<div class="ui checkbox">
						  <input type="checkbox" class="note-check" id="note_check_` + data.id + `" name="example" style="cursor:pointer"/>
						  <label></label>
						</div>
				    </span>
				  </div>
				   	<div class="ui bottom attached button">
				      <i class="eye icon"></i>
				      Show
				    </div>
				</div>
			</div>
			`;
			cards = cards + card;
		});
		document.querySelector('#todo_cards').innerHTML = cards;
		document.querySelectorAll('.edit-icon').forEach(card => {
			card.addEventListener("click", event => {
				alert('edit the note');
			});
		});
		document.querySelectorAll('.remove-todo').forEach(card => {
			card.addEventListener("click", event => {
				alert('remove the note');
			});
		});
		document.querySelectorAll('.note-check').forEach(card => {
			card.addEventListener("input", event => {
				if(card.checked == true){
					alert('check the note');
				}else{
					alert('uncheck the note');
				}
			});
		});
	}

	handleTitleChange = (e) => {
		this.setState({title: e.target.value});
	}
	handleContentChange = (e) => {
		this.setState({content: e.target.value});
	}
	editTodo = (event) => {
		alert(event);
	}
	removeToDo = (event) =>{
		console.log(event);
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
							  <div className="field">
							    <label>Content</label>
							    <textarea className="Content" id="formContent" rows="3" placeholder="Write here your todo details" onChange={this.handleContentChange}></textarea>
							  </div>
							  <button className="ui black button" id="formSubmit" type="submit">Add</button>
							</div>

							<div className="col col-md-12 pt-5" id="todo_cards">
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