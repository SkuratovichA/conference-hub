import React, {Component} from "react";
import axios from 'axios';

class UsersList extends Component {
    constructor(props) {
        super(props);

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
            <div>
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
            </div>
        )
    };
}

export default UsersList;
