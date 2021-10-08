import React from 'react';
import '../css/App.css';
import Header from './Header';
import Calendar from './Calendar';


class App extends React.Component {
state = {claendarStatus: false};
handleCallback = (childData) =>{
        this.setState({claendarStatus: childData});
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
          <div className="app-content">{calendar}</div>

        </>
      );
  }
}

export default App;
