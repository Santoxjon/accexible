import { BrowserRouter, Route, Link } from 'react-router-dom';

import Login from './users/Login';

function Main() {
    return (
        <main>
            <BrowserRouter>
                <Route exact path="/">
                    <p>Main</p>
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
            </BrowserRouter>
        </main>
    )
}export default Main;