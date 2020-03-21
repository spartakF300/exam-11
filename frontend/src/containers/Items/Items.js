import React, {Component} from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle, Col, Row} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";
import {fetchCategories} from "../../store/actions/categoriesActions";
import {connect} from "react-redux";
import {getItem} from "../../store/actions/actionItems";
class Items extends Component {
    componentDidMount() {
        this.props.getItem()
    }
 async componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id){
            this.props.getItem(this.props.match.params.id)
        }
}

    render() {
        return (
            <Row>
                {/*{this.props.loading && <div>Loading...</div>}*/}

                {this.props.items.map(item => (
                    <Col key={item._id} xs="12" sm="6" md="4">
                        <Card className="mb-3">
                            {
                                item.image !== 'null'
                                ? <RouterNavLink to={`/item/${item._id}`}>
                                    <CardImg top  width="100%" src={`http://localhost:8000/uploads/${item.image}`}
                                             alt={item.title}
                                    />
                                </RouterNavLink>
                                : null
                            }
                            <CardBody>
                                <CardTitle
                                    tag={RouterNavLink}
                                    to={`/item/${item._id}`}
                                >
                                    {item.title}
                                </CardTitle>
                                <CardText>{item.price} USD</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        );
    }
}
const mapStateToProps = state=>{
  return{
      categories:state.categories.categories,
      items:state.item.items
  }
};
const mapDispatchToProps = dispatch => ({
    fetchCategories: () => dispatch(fetchCategories()),
    getItem:(id)=>  dispatch(getItem(id))
});
export default connect(mapStateToProps,mapDispatchToProps) (Items);