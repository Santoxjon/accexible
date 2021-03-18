import { Route } from 'react-router-dom';
import Login from './users/Login';
import Register from './users/Register';
import Test from './users/Test';
import UserDetails from './users/UserDetails';
import ChangePassword from './users/ChangePassword';
import Chatbot from './users/Chatbot';
import Results from './users/Results';

function Main() {
    return (
        <main>
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
                <Chatbot />
            </Route>
        </main>
    )
} export default Main;