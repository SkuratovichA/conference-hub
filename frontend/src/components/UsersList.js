import React, {Component, Fragment} from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {getConfs} from "../actions/confs";

class UsersList extends Component {
    // constructor(props) {
    //     super(props);
    // };

    static propTypes = {
        changenameother: PropTypes.array.isRequired,
        getConfs: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getConfs();
    }


    render() {
        return (
            <Fragment>
                <h1 className="text-success
                            text-uppercase text-center my-4"
                >
                    HELLO USER LIST
                </h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.changenameother.map(conf => (
                            <tr key={conf.username}>
                                <td>{conf.username}</td>
                            </tr>
                        ))  }
                    </tbody>
                </table>
            </Fragment>
        )
    };
}

const mapStateToProps = state => ({
    // new : reducer name var
    changenameother: state.changename.changename
});

export default connect(mapStateToProps, { getConfs })
(UsersList);

// import React, {Component} from "react";
// import axios from 'axios';
//
// class UsersList extends Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             usersList: [],
//         };
//     };
//
//     componentDidMount() {
//         this.refreshList();
//     };
//
//     refreshList = () => {
//         axios
//             .get('http://localhost:8000/users/api/users_list')
//             .then(res => this.setState({usersList: res.data}))
//             .catch(err => console.log(err))
//     };
//
//     renderItems = () => {
//         const newItems = this.state.usersList;
//         return newItems.map((item) => (
//             <li
//                 key={item.username}
//                 className="list-group-item d-flex justify-content-between align-items-center"
//             >
//                 {item.username}
//             </li>
//         ));
//     };
//
//     render() {
//         return (
//             <div>
//                 <h1 className="text-success text-uppercase text-center my-4">
//                     HELLO USER LIST
//                 </h1>
//                 <div className="row">
//                     <div className="col-md-6 col-sm-10 mx-auto p-0">
//                         <div className="card p-3">
//                             <div className="">
//                                 <ul className="list-group list-group-flush">
//                                     {this.renderItems()}
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     };
// }
//
// export default UsersList;
