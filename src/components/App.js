import React from 'react';
import '../css/App.css';
import Header from './Header';
import Calendar from './Calendar';
import AddTodo from './AddTodo';
import Cookies from 'universal-cookie';
import LoginForm from './LoginForm';
import ShowNote from './ShowNote';

class App extends React.Component {
    state = {
      calendar: false,
      login_status: false,
      date: new Date(),
      show: false,
      show_title: null,
      show_content: null,
    };
    handleCallback = (childData) =>{
        this.setState({
          calendar: childData
        });

    }
    parentSetDate = (childData) => {
        this.setState({
          date: childData['date'],
          calendar: childData['claendarStatus'],
          show: false,
          show_title: null,
          show_content: null,
        });     
    }
    parentDate = () => {
      return this.state.date;
    }
    calendarStatus = () => {
      return this.state.calendar;
    }
    showNote = (title, content) => {
      this.setState({
        show: true,
        show_title: title,
        show_content: content,
      });
    }
    unshowNote = () => {
     this.setState({
        show: false,
        show_title: null,
        show_content: null,
      }); 
    }
  componentDidMount(){
    this.setState({
      date: new Date()
    });
    const cookies = new Cookies();
    const randomStr = (length) => {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       return result;
    }
    const isLoggedIn = () => {
      let mp_todo_user_id = cookies.get('mpTodoUserId');
      let loggedIn = false;
      if(mp_todo_user_id){
        loggedIn = true;
      }else{
        let new_cookie = cookies.set('mpTodoUserId', randomStr(100), { path: '/', expires: calculateDate(Date.now(), 1*30*12*4) });
        if(new_cookie){
          loggedIn = true;
        }else{
          loggedIn = false;
        }
      }  
      return loggedIn;
    }
    const calculateDate = (since, target) => {
      // target is inserted by day lenght, example: 1*30*12*4
      let now = new Date(since);
      let result = new Date(now);
      result.setDate(new Date(Date.now()).getDate() + target);
      return result; 
    }
    this.setState({login_status: isLoggedIn()});
  }

  render(){
    let content;
    if(this.state.login_status == false){
      content = <LoginForm/>;
    }else{
      if (this.state.calendar === true) {
        content = <Calendar parentSetDate = {this.parentSetDate}/>;
      }else{
        if(this.state.show == true){
          content = <ShowNote title={this.state.show_title} content={this.state.show_content} back={this.unshowNote}/>;
        }else{
          content = <AddTodo rootDate={this.state.date} showNote={this.showNote}/>;
        }
      }

    }
    return(
        <>
          <Header parentCallback = {this.handleCallback} parentDate = { this.parentDate } calendarStatus = {this.state.calendar}/>
          <div className="app-content">{content}</div>
        </>
      );
  }
}

export default App;
