import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteUserAction, setSelectUserAction } from "../../store/actions/userAction";

class UserManagement extends Component {
  state = {
    keyword: "",
  }
  renderContent = () => {
   // console.log(this.props.userList);
   const data =this.props.userList.filter(element => {
      return element.username.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !==-1
   })
  //  return this.props.userList.map((element, idx) => {
    return data.map((element) => {
        const className = (element.id) % 2 ===0 ? "bg-light": "";
        return (
            <tr key={element.id} className={className}>
        <td>{element.MaSV} </td>
        <td>{element.username}</td>
        <td>{element.email}</td>
        <td>{element.phoneNumber}</td>
       
        <td>
          <button onClick={() => this.props.dispatch(setSelectUserAction(element))} className="btn btn-info mr-2">EDIT</button>
          <button onClick={() => this.props.dispatch(deleteUserAction(element))} className="btn btn-danger">DELETE</button>
        </td>
      </tr>
        );
    });
  };

  handleChange =(event) => {
    console.log(event.target.value);
    this.setState({
      keyword:event.target.value,
    })
  }

  render() {
    return (
      <div className="card p-0 mt-3">
        <div className="card-header font-weight-bold">USER MANAGEMENT</div>
        <div className="row mt-4 px-3 ">
          <div className="col-4">
            <div className="form-group mb-0">
              <input
              onChange={this.handleChange}
                type="text"
                placeholder="Search by full name..."
                className="form-control"
              />
            </div>
          </div>
          <div className="col-3 ml-auto">
            <div className="form-group mb-0">
              <select className="form-control">
                <option>All</option>
                <option>Client</option>
                <option>Admin</option>
              </select>
            </div>
          </div>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Mã SV</th>
                <th>Họ tên</th>
                <th>SĐT</th>
                <th>Email</th>
               
               
                <th></th>
              </tr>
            </thead>
            <tbody>{this.renderContent()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.userReducer.userList,
  };
};

export default connect(mapStateToProps)(UserManagement);
