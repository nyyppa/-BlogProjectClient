import React from 'react';
import Grid from '@material-ui/core/Grid';
import post from "./post";

var blogPost;
var suorita = false;

export default class ShowOne extends React.Component{
    constructor(props) {
        super(props);
        this.state = { id: 0};
    }
    componentDidMount (){
        const blog  = this.props.match.params.blog;
        console.log("ShowOne data: " + blog);
        suorita = true;
        this.setState({ id: blog});
    }
    render() {
        if(suorita) {
            let ids = this.state.id;
            fetch("http://localhost:8080/blogs/" + ids).then(response => response.json()).then(data => {
                console.log("json in showdata: " + JSON.stringify(data));
                blogPost = new post(data.blogId, data.author, data.text, data.tags);
            }).then(i => {
                suorita = false;
                this.setState({id: ids});
            });
        }
        return (<div>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    teksti
                </Grid>
                <Grid item xs={4}>
                    tiedot
                </Grid>
            </Grid>
        </div>);
    }
}