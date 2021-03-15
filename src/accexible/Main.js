import { Route } from 'react-router-dom';
import Login from './users/Login';

function Main() {
    return (
        <main>
            <Route exact path="/">
                <p>Main</p>
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            {/* <Route exact path="/register">
                    <Register />
                </Route> */}
        </main>
    )
} export default Main;