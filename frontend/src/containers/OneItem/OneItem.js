import React, {Component} from 'react';
import {deleteItem, getOneItem} from "../../store/actions/actionItems";
import {connect} from "react-redux";
import {Button, Card, CardBody, CardImg, CardText, CardTitle, Col} from "reactstrap";
class OneItem extends Component {
    componentDidMount() {
        this.props.getOneItem(this.props.match.params.id)
    }
    render() {

        return this.props.item && (
            <Col className="m-auto" xs="12" sm="6" md="10">
                <Card className="mb-4 mt-4 ">

                    {

                        this.props.item.image !== 'null'
                            ?

                            <CardImg style={{height: '400px'}} top width="100%" src={`http://localhost:8000/uploads/${this.props.item.image}`}
                                     alt={this.props.item.title}
                            />

                            : null
                    }
                    <CardBody>
                        <CardTitle>Category: {this.props.item.category.title}</CardTitle>
                        <CardTitle>
                           Title: {this.props.item.title}
                        </CardTitle>

                        <CardText>Price: {this.props.item.price} USD</CardText>
                        <CardText>Author: {this.props.item.user.displayname}</CardText>
                        <CardText>Phone: {this.props.item.user.phone}</CardText>
                        <CardText>text: {this.props.item.description}</CardText>
                        <Button onClick={()=>this.props.deleteItem(this.props.item._id)}>Delete</Button>
                    </CardBody>

                </Card>
            </Col>
        );
    }
}
const mapStateToProps = state => {
    return {
        item: state.item.item
    }
};
const mapDispatchToProps = dispatch => ({
    getOneItem: (id) => dispatch(getOneItem(id)),
    deleteItem: (id)=> dispatch(deleteItem(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(OneItem);