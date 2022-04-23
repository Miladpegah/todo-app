import React from 'react';
import { saveAs } from 'file-saver';
import '../css/App.css';
import axios from 'axios';

class AddTodo extends React.Component{
	constructor(props, ref) {
      	super(props);
	    this.state = {
			data: null,
		};
		   		
   	}
	xhttp = new XMLHttpRequest();
	date = [];

	componentWillMount(){
		this.setState({
			data:[
				{
					id: 1,
					title: 'number one',
					content: 'jf kdsjfskj fs',
					checked: true,
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
			let is_checked = '';
			if(data.checked == true){
	  			is_checked = 'checked';
	  		}
			let card = `
			<div class="col-md-12">
				<div class="ui card d-inline-block w-100" id="todo_card_` + data.id +`">
				  <div class="content">
				    <i class="right floated edit icon edit-icon" style="cursor:pointer" data-id="` + data.id + `"></i>
				    <div class="header">Cute Dog</div>
				    <div class="description">
				      <p>
				      	lorem ipsum
				      </p>
				    </div>
				  </div>
				  <div class="extra content">
				    <span class="left floated">
				      <i class="trash icon remove-todo" style="cursor:pointer" data-id="` + data.id + `" data-parent="todo_card_` + data.id +`"></i>
				    </span>
				    <span class="right floated" data-inverted="" data-tooltip="Done" data-position="right center" data-id="` + data.id + `">
				      	<div class="ui checkbox">
						  <input type="checkbox" class="note-check" id="note_check_` + data.id + `" name="example" style="cursor:pointer" data-id="` + data.id + `" ` + is_checked + `/>
						  <label></label>
						</div>
				    </span>
				  </div>
				   	<div class="ui bottom attached button show-note" data-id="` + data.id + `">
				      <i class="eye icon"></i>
				      Show
				    </div>
				</div>
			</div>
			`;
			cards = cards + card;
		});
		document.querySelector('#todo_cards').innerHTML = cards;
		document.querySelectorAll('.edit-icon').forEach(edit => {
			edit.addEventListener("click", event => {
				let data = this.state.data.find(d => d.id == edit.dataset.id);
				document.querySelector('#addTodoForm').innerHTML += `<button class="ui button" id="formCancel" type="button">Cancel</button>`;
				document.querySelector('#formTitle').value = data.title;
				document.querySelector('#formContent').value = data.content;
				document.querySelector('#formSubmit').dataset.job = 'update';
				document.querySelector('#formSubmit').dataset.target = edit.dataset.id;
				document.querySelector('#formSubmit').innerHTML = 'Update';
				
				// cancel action
				document.querySelector('#formCancel').addEventListener("click", event => {
					document.querySelector('#formTitle').value = '';
					document.querySelector('#formContent').value = '';
					document.querySelector('#formSubmit').dataset.job = 'create';
					document.querySelector('#formSubmit').innerHTML = 'Add';
					document.querySelector('#formSubmit').dataset.target = '';
					document.querySelector('#formCancel').remove();
				});

				document.querySelector('#formSubmit').addEventListener("click", event => {
					let target = event.target.dataset.job;
					if(target == 'create'){
						let data = {
							user_id: 1,
							title: document.querySelector('#formTitle').value,
							content: document.querySelector('#formContent').value,
							date: this.props.rootDate
						};
						// create ajax
						
						// this.xhttp.onload = function() {
					  	//   console.log(this.responseText);
					  	// }
					  	// this.xhttp.open("method", "url");
					  	// this.xhttp.send();
					  	// this.xhttp.send('date');

					}else if(target == 'update'){
						let data = {
							user_id: 1,
							title: document.querySelector('#formTitle').value,
							content: document.querySelector('#formContent').value,
							date: this.props.rootDate
						};
						// update ajax
						
						// this.xhttp.onload = function() {
					  	//   console.log(this.responseText);
					  	// }
					  	// this.xhttp.open("method", "url");
					  	// this.xhttp.send();
					  	// this.xhttp.send('date');
					}
				});
			});
		});

		// Note remove
		document.querySelectorAll('.remove-todo').forEach(card => {
			card.addEventListener("click", event => {
				document.querySelector('#' + card.dataset.parent).remove();
				  	
				  	// this.xhttp.onload = function() {
					  //   console.log(this.responseText);
				  	// }
				  	// this.xhttp.open("method", "url");
				  	// this.xhttp.send();
				  	// this.xhttp.send('date');
			});
		});

		// Note check
		document.querySelectorAll('.note-check').forEach(card => {
			card.addEventListener("input", event => {
				if(card.checked == true){
					let id = card.dataset.id;
					// send the is_checked request
					// this.xhttp.onload = function() {
					//     console.log(this.responseText);
				 	//  }
				  	// this.xhttp.open("GET", "https://gorest.co.in/public/v2/users/100/posts");
				  	// this.xhttp.open("GET", "http://miladapi.ihweb.ir/php/");
				  	// this.xhttp.open("GET", "http://127.0.0.1/new_test.php");
					// XMLHttpRequest.setRequestHeader('Access-Control-Allow-Origin', '*');
				  	// this.xhttp.send();
				 // axios.get(`https://gorest.co.in/public/v2/users/100/posts`)
			  //     .then(res => {
			  //     	console.log(res);
			  //     });
				  	// this.xhttp.send('date');
				}else{
					let id = card.dataset.id;

					// send the uncheck request

					// this.xhttp.onload = function() {
					  //   console.log(this.responseText);
				  	// }
				  	// this.xhttp.open("method", "url");
				  	// this.xhttp.send();
				  	// this.xhttp.send('date');
				}
			});
		});


		// Form submit
		document.querySelector('#formSubmit').addEventListener("click", event => {
			let target = event.target.dataset.job;
			if(target == 'create'){
				let data = {
					user_id: 1,
					title: document.querySelector('#formTitle').value,
					content: document.querySelector('#formContent').value,
					date: this.props.rootDate
				};
				console.log(data);
				// create ajax
			}else if(target == 'update'){
				let data = {
					user_id: 1,
					title: document.querySelector('#formTitle').value,
					content: document.querySelector('#formContent').value,
					date: this.props.rootDate
				};
				console.log(data);
				// update ajax
			}
		});

		document.querySelectorAll('.show-note').forEach(btn => {
			btn.addEventListener("click", event => {
				let id = btn.dataset.id;
				let data = this.state.data.find(d => d.id == id);
				let title = data.title;
				let content = data.content;
				this.props.showNote(title, content);

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
	formAction = () => {
		
		let target = document.querySelector('#formSubmit');
		console.log(target);
		// if(target == 'create'){
		// 	console.log()	('create');
		// }else if(target == 'update'){
		// 	alert('update');
		// }
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
							  <button className="ui black button" id="formSubmit" data-job="create" data-target='' type="button">Add</button>
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