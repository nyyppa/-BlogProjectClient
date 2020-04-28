import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Route, Link, BrowserRouter} from 'react-router-dom';
import ShowOne from "./ShowOne";
import Deletedone from "./deleteDone";
import ShowTags from "./ShowTags";

const maini = () => <App/>;
const posting = (props) => <ShowOne {...props}/>;
const del = () => <Deletedone/>;
const tags = (props) => <ShowTags {...props}/>;
class Help extends React.Component{
    render() {
        return (
          <BrowserRouter>
            <Route exact={true} path="/" component={maini}/>
            <Route path="/show/:blog" component={posting} />
            <Route path="/deletion" component={del} />
            <Route path="/tags/:tag" component={tags}/>
          </BrowserRouter>
        );
    }
}

ReactDOM.render(<Help />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
