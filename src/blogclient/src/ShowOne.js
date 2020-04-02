import React from 'react';
import ReactDOM from 'react-dom';

export default class ShowOne extends React.Component{
    componentDidMount (){
        const blog  = this.props.match.params.blog;
        console.log("ShowOne data: " + blog);
    }
    render() {
        return (<h1>Testi</h1>);
    }
}