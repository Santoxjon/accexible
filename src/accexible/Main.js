import { BrowserRouter, Route, Link } from 'react-router-dom';

function Main() {
    return (
        <main>
            <BrowserRouter>
                <Route exact path="/">
                    <p>Main</p>
                </Route>
            </BrowserRouter>
        </main>
    )
}

export default Main;