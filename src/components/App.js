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
      login_status: false
    };
    handleCallback = (childData) =>{
        this.setState({claendarStatus: childData});
    }

  componentDidMount(){
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
      content = <LoginForm/>
    }
    else if (this.state.claendarStatus === true) {
      content = <Calendar/>;
    }else{
      content = <AddTodo/>;
    }
    return(
        <>
          <Header parentCallback = {this.handleCallback}/>
          <div className="app-content">{content}</div>
        </>
      );
  }
}

export default App;
