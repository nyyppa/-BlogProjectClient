import React from 'react';
import post from "./post";
import BlogList from "./BlogList";

var suorita = false;
var nayta = false;
var lista = [];
export default class ShowTags extends React.Component{
    constructor(props) {
        super(props);
        this.state = {id: 0};
    }
    componentDidMount (){
        const tag  = this.props.match.params.tag;
        suorita = true;
        this.setState({id: tag});
    }

    render() {
        if(suorita){
            let out = {tagId: this.state.id};
            fetch("http://localhost:8080/blogsWithTag", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(out),
            }).then(response => response.json()).then(data => {
                console.log("json: " + JSON.stringify(data));
                for (const item of data) {
                    lista.push(new post(item.blogId, item.author, item.text, item.tags));
                }
            }).then(i => {
                suorita = false;
                nayta = true;
                this.setState({ id: this.state.id});
            })
        }
        if(nayta){
            return(<div><h1>List of posts with: {this.state.id}</h1><BlogList lista={lista}/></div>);
        } else {
            return (<h1>Downloading...</h1>);
        }
    }

}