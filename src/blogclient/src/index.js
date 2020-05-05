import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Route, Link, BrowserRouter} from 'react-router-dom';
import ShowOne from "./ShowOne";
import Deletedone from "./deleteDone";
import ShowTags from "./ShowTags";
//main view
const maini = () => <App/>;
//view show one blogpost
const posting = (props) => <ShowOne {...props}/>;
//view what show when deletion is done
const del = () => <Deletedone/>;
//view what show posts by tag
const tags = (props) => <ShowTags {...props}/>;
class Help extends React.Component{
    render() {
        //view what contains different view depending from url
        return (
          <BrowserRouter>
            <Route exact={true} path="/" component={maini}/>
            <Route path="/show/:blog" component={posting} />
            <Route path="/deletion" component={del} />
            <Route path="/showtag/:tag" component={tags}/>
          </BrowserRouter>
        );
    }
}

ReactDOM.render(<Help />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
