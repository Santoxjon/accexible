import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import { BrowserRouter } from 'react-router-dom';

function Site() {
    return (
        <BrowserRouter>
            <Header />
            <Main />
            <Footer />
        </BrowserRouter>
    )
}

export default Site;