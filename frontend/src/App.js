import logo from './logo.svg';
import './App.css';
import React, {Component} from "react";
import axios from 'axios';


class App extends Component {
    constructor(props) {
        super(props);

        // add the props here
        // state for each user I guess?
        this.state = {
            usersList: [],
        };
    };

    componentDidMount() {
        this.refreshList();
    };

    refreshList = () => {
        axios
            .get('http://localhost:8000/users/api/users_list')
            .then(res => this.setState({usersList: res.data}))
            .catch(err => console.log(err))
    };

    renderItems = () => {
        const newItems = this.state.usersList;
        return newItems.map((item) => (
            <li
                key={item.username}
                className="list-group-item d-flex justify-content-between align-items-center"
                >
                {item.username}
            </li>
        ));
    };

   render() {
       return (
           <main className="content">
               <h1 className="text-success text-uppercase text-center my-4">
                   HELLO USER LIST
               </h1>
               <div className="row">
                   <div className="col-md-6 col-sm-10 mx-auto p-0">
                       <div className="card p-3">
                           <div className="">
                              <ul className="list-group list-group-flush">
                                {this.renderItems()}
                              </ul>
                           </div>
                       </div>
                   </div>
               </div>
           </main>
       )
   };
}

export default App;

// function App() {
//   return (
//       <div className="App"><h2>Hello</h2></div>
//   );
//   // return (
//   //   <div className="App">
//   //     <header className="App-header">
//   //       <img src={logo} className="App-logo" alt="logo" />
//   //       <p>
//   //         Edit <code>src/App.js</code> and save to reload.
//   //       </p>
//   //       <a
//   //         className="App-link"
//   //         href="https://reactjs.org"
//   //         target="_blank"
//   //         rel="noopener noreferrer"
//   //       >
//   //         Learn React
//   //       </a>
//   //     </header>
//   //   </div>
//   // );
// }
