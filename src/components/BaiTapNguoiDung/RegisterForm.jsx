import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import {
  addUserAction,
  updateUserAction,
} from "../../store/actions/userAction";

class RegisterForm extends Component {
  maSVInputRef = createRef();
  usernameInputRef = createRef();
  emailInputRef = createRef();
  phoneNumberInputRef = createRef();

  state = {
    MaSV: "",
    username: "",
    phoneNumber: "",
    email: "",
  };

  static getDerivedStateFromProps(nextProps, currentState) {
    console.log("nextProps", nextProps);
    console.log("currentState", currentState);
    //currentState = nextProps.selectedUser;
    if (
      nextProps.selectedUser &&
      nextProps.selectedUser.id !== currentState.id
    ) {
      console.log(123);
      currentState = nextProps.selectedUser;
    }

    return currentState;
  }

  handleChange = (event) => {
    //console.log(event);
    console.log(event.target.name);
    console.log(event.target.value); //log ra value tu o input
    // dynamic key thông qua object literals
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  validateRequired = (value, ref, message) => {
    if (value) {
      ref.innerHTML = "";

      return true;
    }

    ref.innerHTML = message;

    return false;
  };

  validateEmail = (value, ref, message) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      //neu thoa man patern cua email
      ref.innerHTML = "";
      return true;
    }
    ref.innerHTML = message;

    return false;
  };

  validateuserName = (value, ref, message) => {
    if (
      /[a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]/.test(
        value
      )
    ) {
      //neu thoa man patern cua email
      ref.innerHTML = "";
      return true;
    }
    ref.innerHTML = message;

    return false;
  };

  validatePhone = (value, ref, message) => {
    if (/^[0-9]/.test(value)) {
      //neu thoa man patern cua email
      ref.innerHTML = "";
      return true;
    }
    ref.innerHTML = message;

    return false;
  };

  kiemtraMaSVTonTai = (value, ref, message, listSV) => {
   
    const idx = listSV.findIndex((element) => element.MaSV === value);
    console.log(idx);
    if (idx !== -1) {//tìm thấy
     
      
        ref.innerHTML = message;

        return false;
    }else{
     
      ref.innerHTML = "";
      return true;
      
    }

  
  };

  handleSubmit = (event) => {
   
    event.preventDefault(); //chống load trang
    const data = this.props.userList;
    console.log(data);
    console.log(this.state);
    let isValid = true;
    //= domElementId

    isValid &=
      this.validateRequired(
        this.state.MaSV,
        this.maSVInputRef.current,
        "Mã SV không đc bỏ trống"
      );
      
      if(this.state.id=="") {
  isValid &= this.kiemtraMaSVTonTai(
    this.state.MaSV,
    this.maSVInputRef.current,
    "maSV đã tồn tại",
    data
  );
}
     

    isValid &=
      this.validateRequired(
        this.state.username,
        this.usernameInputRef.current,
        "Username không đc bỏ trống"
      ) &&
      this.validateuserName(
        this.state.username,
        this.usernameInputRef.current,
        "họ tên ko dung dinh dang"
      );

    isValid &=
      this.validateRequired(
        this.state.email,
        this.emailInputRef.current,
        "Email không đc bỏ trống"
      ) &&
      this.validateEmail(
        this.state.email,
        this.emailInputRef.current,
        "Email ko dung dinh dang"
      );

    isValid &=
      this.validateRequired(
        this.state.phoneNumber,
        this.phoneNumberInputRef.current,
        "sđt không đc bỏ trống"
      ) &&
      this.validatePhone(
        this.state.phoneNumber,
        this.phoneNumberInputRef.current,
        "sdt ko dung dinh dang"
      );

    if (isValid) {
      // cờ để so sánh add hoặc update
      console.log(this.state.id);
      if (this.state.id) {
        //   //edit mode
        console.log("edit mode");
        this.props.dispatch(updateUserAction(this.state));
       
      } else {
        console.log("add mode");
        this.props.dispatch(addUserAction(this.state));
       
      }
    }

    
    this.setState({
      //sau khi save (add) item moi set state ve mặc định
      id: "",
      MaSV: "",
      username: "",
      phoneNumber: "",
      email: "",
    });
    
    

    console.log(isValid);
    //this.usernameInputRef.current.innerHTML ="username ko dc bỏ trống ";
    //console.log(this.state);
  };

  render() {
    return (
      <div className="card p-0">
        <div className="card-header bg-success text-white font-weight-bold">
          Thêm Sinh Viên
        </div>
        <div className="card-body">
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label>Mã SV</label>
                  <input
                    //onChange={(event) => {this.handleChange(event)}}
                    // value={this.props.selectedUser?.id}
                    value={this.state.MaSV}
                    onChange={this.handleChange}
                    type="text"
                    className="form-control"
                    name="MaSV"
                    id="MaSV"
                  />
                  <span ref={this.maSVInputRef} className="text-danger"></span>
                </div>
              </div>

              <div className="col-6">
                <div className="form-group">
                  <label>Họ tên</label>
                  <input
                    //onChange={(event) => {this.handleChange(event)}}
                    // value={this.props.selectedUser?.username}
                    value={this.state.username}
                    onChange={this.handleChange}
                    type="text"
                    className="form-control"
                    name="username"
                  />
                  <span
                    ref={this.usernameInputRef}
                    className="text-danger"
                  ></span>
                </div>
              </div>

              <div className="col-6">
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    //  value={this.props.selectedUser?.phoneNumber}
                    value={this.state.phoneNumber}
                    name="phoneNumber"
                    onChange={this.handleChange}
                    type="text"
                    className="form-control"
                  />
                  <span
                    ref={this.phoneNumberInputRef}
                    className="text-danger"
                  ></span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    //  value={this.props.selectedUser?.email}
                    value={this.state.email}
                    name="email"
                    onChange={this.handleChange}
                    type="text"
                    className="form-control"
                  />
                  <span ref={this.emailInputRef} className="text-danger"></span>
                </div>
              </div>
            </div>

            <button className="btn btn-warning mr-2" type="submitr">
              thêm sinh viên
            </button>

            {/* <button type="reset" value="reset" className="btn btn-outline-dark">
              RESET
            </button>  */}
            {/* phải nhét vào form type reset mới ăn */}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedUser: state.userReducer.selectedUser,
    userList: state.userReducer.userList,
  };
};

export default connect(mapStateToProps)(RegisterForm);
