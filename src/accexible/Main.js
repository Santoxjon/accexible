import { BrowserRouter, Route, Link } from 'react-router-dom';

function Main() {
    return (
        <BrowserRouter>
        <Route exact path="/">
            <p>Main</p>
        </Route>
        </BrowserRouter>
    )
}

export default Main;