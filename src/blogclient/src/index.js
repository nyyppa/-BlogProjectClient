import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Route, Link, BrowserRouter} from 'react-router-dom';
import ShowOne from "./ShowOne";
import Deletedone from "./deleteDone";
import ShowTags from "./ShowTags";
import Form from './Form'

const inputs = [{
    name: "username",
    placeholder: "username",
    type: "text"
},{
    name: "password",
    placeholder: "password",
    type: "password"
},{
    type: "submit",
    value: "Submit",
    className: "btn"
}]

const props = {
    name: 'loginForm',
    method: 'POST',
    action: '/perform_login',
    inputs: inputs
}

const maini = () => <App/>;
const posting = (props) => <ShowOne {...props}/>;
const del = () => <Deletedone/>;
const tags = (props) => <ShowTags {...props}/>;
const params = new URLSearchParams(window.location.search)
class Help extends React.Component{
    render() {
        return (
            <div>
                <Form {...props} error={params.get('error')} />
          <BrowserRouter>
            <Route exact={true} path="/" component={maini}/>
            <Route path="/show/:blog" component={posting} />
            <Route path="/deletion" component={del} />
            <Route path="/tags/:tag" component={tags}/>
          </BrowserRouter>
            </div>
        );
    }
}

ReactDOM.render(<Help />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
