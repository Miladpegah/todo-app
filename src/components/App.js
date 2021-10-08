import React from 'react';
import '../css/App.css';
import Header from './Header';
import Calendar from './Calendar';


class App extends React.Component {


  render(){
    return(
        <>
          <Header/>
          <Calendar/>
        </>
      );
  }
}

export default App;
