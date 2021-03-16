import { Route } from 'react-router-dom';
import Login from './users/Login';
import Register from './users/Register';
import UserDetails from './users/UserDetails';

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
            <Route exact path="/userdetails">
                <UserDetails />
            </Route>
        </main>
    )
} export default Main;