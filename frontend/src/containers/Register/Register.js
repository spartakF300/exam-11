import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Alert, Button, Form, FormGroup} from "reactstrap";

import {registerUser} from "../../store/actions/usersActions";
import FormElement from "../../components/Ui/Form/FormElement";


class Register extends Component {
    state = {
        displayname: '',
        phone: '',
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
        this.props.registerUser({...this.state});
    };

    getFieldError = fieldName => {
        try {
            return this.props.error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    render() {
        return (
            <Fragment>
                <h3 className="my-3 text-center">Sign up</h3>
                <div className="form p-4">
                    {this.props.error && this.props.error.global && (
                        <Alert color="danger">
                            {this.props.error.global}
                        </Alert>
                    )}
                    <Form onSubmit={this.submitFormHandler}>
                        <FormElement
                            propertyName="displayname"
                            type="text"
                            value={this.state.displayname}
                            onChange={this.inputChangeHandler}
                            error={this.getFieldError('displayname')}
                            placeholder="Your display name"
                            autoComplete="new-displayName"
                            title="Display name"
                        />

                        <FormElement
                            propertyName="phone"
                            type="text"
                            value={this.state.phone}
                            onChange={this.inputChangeHandler}
                            error={this.getFieldError('phone')}
                            placeholder="Your phone number"
                            autoComplete="new-phone"
                            title="Phone"
                        />

                        <FormElement
                            propertyName="username"
                            type="text"
                            value={this.state.username}
                            onChange={this.inputChangeHandler}
                            error={this.getFieldError('username')}
                            placeholder="Enter new username"
                            autoComplete="new-username"
                            title="Username"
                        />

                        <FormElement
                            propertyName="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.inputChangeHandler}
                            error={this.getFieldError('password')}
                            placeholder="Enter new password"
                            autoComplete="new-password"
                            title="Password"
                        />

                        <FormGroup className="mb-0 mt-4">
                            <Button type="submit" color="info" className="w-100">Register</Button>
                        </FormGroup>
                    </Form>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    error: state.users.registerError
});

const mapDispatchToProps = dispatch => ({
    registerUser: userData => dispatch(registerUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
