import React from 'react';
import '../css/App.css';
import Header from './Header';
import Calendar from './Calendar';
import AddTodo from './AddTodo';
import Cookies from 'universal-cookie';
import LoginForm from './LoginForm';

class App extends React.Component {
    state = {
      claendarStatus: false,
      login_status: false,
      date: null,
    };
    handleCallback = (childData) =>{
        this.setState({
          claendarStatus: childData
        });

    }
    parentSetDate = (childData) => {
        this.setState({
          date: childData['date'],
          claendarStatus: childData['claendarStatus']
        });      
    }
    parentDate = () => {
      return this.state.date;
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
    let header;  
    if(this.state.login_status == false){
      content = <LoginForm/>;
      header = <Header parentCallback = {this.handleCallback} parentDate = { this.parentDate }/>;
    }
    else if (this.state.claendarStatus === true) {
      content = <Calendar parentSetDate = {this.parentSetDate}/>;
      header = <Header parentCallback = {this.handleCallback} parentDate = { this.parentDate }/>;
    }else{
      content = <AddTodo/>;
      header = <Header parentCallback = {this.handleCallback} parentDate = { this.parentDate }/>;
    }
    return(
        <>
          {header}
          <div className="app-content">{content}</div>
        </>
      );
  }
}

export default App;
