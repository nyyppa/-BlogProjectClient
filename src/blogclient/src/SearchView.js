import React from 'react';
import post from "./post";
import BlogList from "./BlogList";
import SearchBar from 'material-ui-search-bar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var lista = [];
var searchWord;
function SearchView(){
    const [, forceUpdate] = React.useReducer(x => x + 1, 0);
    return (<MuiThemeProvider><div><SearchBar
        onChange={(e) => {
            searchWord = e;
            console.log("searchWord: " + searchWord);
        }}
        onRequestSearch={() => {
            fetch("http://localhost:8080/search/" + searchWord).then(response => response.json()).then(data => {
                lista = [];
                for (const item of data) {
                    lista.push(new post(item.blogId, item.author, item.text, item.tags));
                }
            }).then(i => forceUpdate());
        }}
        style={{
            margin: '0 auto',
            maxWidth: 800
        }}
    /><br/>
    <BlogList lista={lista}/>
    </div></MuiThemeProvider>);
}

export default SearchView;