import React from 'react';
import '../css/App.css';
import Header from './Header';
import Calendar from './Calendar';
import AddTodo from './AddTodo';
import Cookies from 'universal-cookie';

class App extends React.Component {
    state = {
      claendarStatus: false,
      loggedIn: false
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
  }
  render(){
    let calendar;
    if (this.state.claendarStatus === true) {
      calendar = <Calendar/>;
    }else{
      calendar = null;
    }
    return(
        <>
          <Header parentCallback = {this.handleCallback}/>
          <AddTodo/>
          <div className="app-content">{calendar}</div>

        </>
      );
  }
}

export default App;
