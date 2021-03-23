import { Route } from 'react-router-dom';
import Login from './users/Login';
import Register from './users/Register';
import Test from './questionstest/Test';
import UserDetails from './users/UserDetails';
import ChangePassword from './users/ChangePassword';
import Results from './results/Results';
import ChatbotApp from './users/Chatbot';
import React, { useState, useEffect } from 'react';

function Main() {
    const [headerHeight, setHeaderHeight] = useState("0px")
    useEffect(() => {
        setHeaderHeight(document.querySelector("header").clientHeight + "px");
    }, [])

    return (
        <main style={{ "marginTop": headerHeight }}>
            <Route exact path="/">
                <p>Main</p>
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
                <ChatbotApp />
            </Route>
        </main>
    )
} export default Main;