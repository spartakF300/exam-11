import React, {Component, Fragment} from "react";
import {Alert, Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import FormElement from "../../components/Ui/Form/FormElement";
import {connect} from "react-redux";
import {fetchCategories} from "../../store/actions/categoriesActions";
import {addItem} from "../../store/actions/actionItems";
class AddItem extends Component {
    state = {
        title: '',
        description: '',
        price: '',
        image: null,
        category: ''
    };
    componentDidMount() {
        this.props.fetchCategories()
    }
    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    submitFormHandler = event => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(this.state).forEach(key => {
            let value = this.state[key];
            formData.append(key, value);
        });
        this.props.addItem(formData);
    };
    getFieldError = fieldName => {
        try {
            return this.props.error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };
    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
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
                            propertyName="title"
                            type="text"
                            value={this.state.title}
                            onChange={this.inputChangeHandler}
                            error={this.getFieldError('displayname')}
                            placeholder="title"
                            autoComplete="title"
                            title="Title"
                        />
                        <FormElement
                            propertyName="description"
                            type="text"
                            value={this.state.description}
                            onChange={this.inputChangeHandler}
                            error={this.getFieldError('description')}
                            placeholder="description"
                            autoComplete="description"
                            title="Description"
                        />
                        <FormElement
                            propertyName="price"
                            type="text"
                            value={this.state.price}
                            onChange={this.inputChangeHandler}
                            error={this.getFieldError('price')}
                            placeholder="price"
                            autoComplete="price"
                            title="Price"
                        />
                        <FormElement
                            propertyName="image"
                            type="file"
                            onChange={this.fileChangeHandler}
                            error={this.getFieldError('image')}
                            placeholder="image"
                            autoComplete="image"
                            title="Image"
                        />
                        <FormGroup row>
                            <Label sm={2} for="category">Category</Label>
                            <Col sm={10}>
                                <Input
                                    type="select"
                                    name="category" id="category"
                                    value={this.state.category}
                                    onChange={this.inputChangeHandler}
                                >
                                    <option value="">Please select a category...</option>
                                    {this.props.category && this.props.category.map(category => (
                                        <option key={category._id} value={category._id}>{category.title}</option>
                                    ))}
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup className="mb-0 mt-4">
                            <Button type="submit" color="info" className="w-100">Add item</Button>
                        </FormGroup>
                    </Form>
                </div>
            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    category: state.categories.categories
});
const mapDispatchToProps = dispatch => ({
    fetchCategories: () => dispatch(fetchCategories()),
    addItem: (data)=> dispatch(addItem(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(AddItem);