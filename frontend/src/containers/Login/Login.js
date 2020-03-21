import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Alert, Button, Form, FormGroup} from "reactstrap";

import {loginUser} from "../../store/actions/usersActions";
import FormElement from "../../components/Ui/Form/FormElement";

class Login extends Component {
    state = {
        username: '',
        password: '',
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    submitFormHandler = event => {
        event.preventDefault();
        this.props.loginUser({...this.state});
    };

    render() {
        return (
            <Fragment>
                <h3 className="my-3 text-center">Login</h3>
                <div className="form p-4">
                    {this.props.error && (
                        <Alert color="danger">
                            {this.props.error.message || this.props.error.global}
                        </Alert>
                    )}
                    <Form onSubmit={this.submitFormHandler}>
                        <FormElement
                            propertyName="username"
                            type="text"
                            value={this.state.username}
                            onChange={this.inputChangeHandler}
                            placeholder="Username"
                            autoComplete="current-username"
                            title={'Username'}
                        />

                        <FormElement
                            propertyName="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.inputChangeHandler}
                            placeholder="Password"
                            autoComplete="current-password"
                            title="Password"
                        />

                        <FormGroup className="mb-0 mt-4">
                            <Button type="submit" color="info" className="w-100">Login</Button>
                        </FormGroup>
                    </Form>
                </div>
            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    error: state.users.loginError
});

const mapDispatchToProps = dispatch => ({
    loginUser: userData => dispatch(loginUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
