import { Route } from 'react-router-dom';

import Login from './users/Login';
import Register from './users/Register';
import Test from './questionstest/Test';
import UserDetails from './users/UserDetails';
import ChangePassword from './users/ChangePassword';
import Results from './results/Results';
import Chatbot from './chatbot/Chatbot';
import React, { useState, useEffect } from 'react';

import ChatbotApp from './chatbot/Chatbot';
import { Form } from 'react-bootstrap';


function Main() {
    const [headerHeight, setHeaderHeight] = useState("0px")
    useEffect(() => {
        setHeaderHeight(document.querySelector("nav").clientHeight + "px");
    }, [])

    return (
        <main style={{ "marginTop": headerHeight }}>
            <Route exact path="/">
                <Form.Group id="textoIntroductorio">
                    <Form.Label><h6>Sobre LiteApp</h6></Form.Label>
                    <Form.Text><h6>En estos momentos donde la salud mental es tan importante como la salud física, LiteApp te ayuda a descubrir si tienes un principio de ansiedad o si considera que necesitas ayuda médica profesional.</h6>
                </Form.Text>
                <Form.Text><h6>LiteApp es una aplicación realizada para acceXible.</h6></Form.Text>
                </Form.Group>



            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/register">
                <Register />
            </Route>
            <Route exact path="/test">
                <Test />
            </Route>
            <Route exact path="/profile">
                <UserDetails />
            </Route>
            <Route exact path="/changePassword">
                <ChangePassword />
            </Route>
            <Route exact path="/results">
                <Results />
            </Route>
            <Route exact path="/chatbot">
                <Chatbot />
            </Route>
        </main>
    )
} export default Main;