import { Route } from 'react-router-dom';
import Login from './users/Login';
import Register from './users/Register';

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
        </main>
    )
} export default Main;