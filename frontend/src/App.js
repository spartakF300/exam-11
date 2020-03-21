import React, {Fragment, useEffect} from 'react';
import Toolbar from "./components/Ui/Toolbar/Toolbar";
import {Col, Container, Row} from "reactstrap";
import {Route, Switch} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import Sidebar from "./components/Ui/Sidebar/Sidebar";
import Items from "./containers/Items/Items";
import AddItem from "./containers/AddItem/AddItem";
import {useDispatch} from "react-redux";
import {fetchCategories} from "./store/actions/categoriesActions";
import OneItem from "./containers/OneItem/OneItem";

function App() {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchCategories())
    },[]);
    return (
        <Fragment>
            <header>
                <Toolbar/>
            </header>
            <Container style={{marginTop: '20px'}}>
                <Row>
                    <Col xs="12" md="3">
                        <Sidebar/>
                    </Col>
                    <Col xs="12" md="9">
                        <Switch>
                            <Route path="/" exact component={Items}/>
                            <Route path="/categories/:id"  component={Items}/>
                            <Route path="/item/:id"  component={OneItem}/>

                            <Route path="/additem" component={AddItem}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/register" component={Register}/>
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default App;
