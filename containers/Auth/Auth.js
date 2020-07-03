import React, { Component } from "react";
import Input from "../../components/UI/Forms/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Route } from "react-router-dom";
import * as actionCreators from "../../Store/index";
import { connect } from "react-redux";
import "./Auth.css";

class Auth extends Component {
  state = {
    authForm: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "E-mail"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      }
    },
    isSignUp: true
  };

  inputChangeHandler = (event, id) => {
    event.preventDefault();
    const updatedForm = {
      ...this.state.authForm
    };
    const updatedFormElement = { ...updatedForm[id] };
    updatedFormElement.value = event.target.value;
    updatedForm[id] = updatedFormElement;
    this.setState({
      authForm: updatedForm
    });
  };
  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.authForm.email.value,
      this.state.authForm.password.value,
      this.state.isSignUp,
      this.props.history
    );
  };
  switchHandler = () => {
    this.setState(prevState => {
      return {
        isSignUp: !prevState.isSignUp
      };
    });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.authForm) {
      formElementArray.push({
        id: key,
        config: this.state.authForm[key]
      });
    }
    let form = formElementArray.map(formElement => {
      return (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          changed={event => this.inputChangeHandler(event, formElement.id)}
        />
      );
    });
    if (this.props.loading) {
      form = <Spinner />;
    }
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = this.props.error.message;
    }
    let signUp = null;
    if (this.props.signUp) {
      signUp = "Successfully signed-up signIn to order";
    }

    return (
      <div className="Auth">
        {signUp ? (
          <span style={{ color: "green", fontWeight: "bold" }}>
            {errorMessage}
            {signUp}
          </span>
        ) : (
          <span style={{ color: "red", fontWeight: "bold" }}>
            {errorMessage}
            {signUp}
          </span>
        )}

        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">
            {this.state.isSignUp ? "SignUp" : "SignIn"}
          </Button>
          <Button
            btnType="Success"
            type={"button"}
            clicked={this.switchHandler}
          >
            Switch To {this.state.isSignUp ? "SignIn" : "SignUp"}
          </Button>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp, history) =>
      dispatch(actionCreators.auth(email, password, isSignUp, history))
  };
};
const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    signIn: state.auth.signIn,
    signUp: state.auth.signUp
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
