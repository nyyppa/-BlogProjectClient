import React from 'react';
import Grid from '@material-ui/core/Grid';
import post from "./post";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import utils from "./utils";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import commentData from "./commentData";

var blogPost;
var suorita = false;
var nayta = false;
//text what send when create or modify post
var textOut;
//author what send when create or modify post
var authorOut;
//tags
var tags = [];
//for comment
var commentAuthor;
var commentText;

export default class ShowOne extends React.Component{
    constructor(props) {
        super(props);
        this.state = { id: 0};
    }
    componentDidMount (){
        const blog  = this.props.match.params.blog;
        console.log("ShowOne data: " + blog);
        suorita = true;
        this.setState({ id: blog, open: false, comment: false});
    }
    render() {
        const classes = makeStyles((theme) => ({
            root: {
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                '& > *': {
                    margin: theme.spacing(0.5),
                },
            },
        }));
        const handleClickOpen = () => {
            //get data and put it to variables
            authorOut = blogPost.getAuthor();
            textOut = blogPost.getText();
            tags = blogPost.getTags();
            this.setState({open: true});
        };
        // This call when dialog close
        const handleClose = () => {
            //change post data from backend
            utils.prototype.addPostWithTags(blogPost.getID(), authorOut, textOut, tags);
            //load list data again with setTimeout because fetch need time
            setTimeout(() => {
                suorita = true;
                nayta = false;
                this.setState({open: false});
            } , 700);
        };
        // This call when dialog close without modify
        const handleClose2 = () => {
            this.setState({open: false});
        };
        //button action to new comment adding
        const handleClickOpenComment = () => {
            this.setState({comment: true});
        };
        // This call when dialog close
        const handleCloseComment = () => {
            //add comment to backend
            let outData = new commentData(commentAuthor, commentText);
            utils.prototype.addComment(outData, this.state.id);
            //load list data again with setTimeout because fetch need time
            setTimeout(() => {
                this.setState({comment: false});
            } , 750);
        };
        // This call when dialog close without modify
        const handleClose2Comment = () => {
            this.setState({comment: false});
        };
        if(suorita) {
            let ids = this.state.id;
            fetch("http://localhost:8080/blogs/" + ids).then(response => response.json()).then(data => {
                console.log("json in showdata: " + JSON.stringify(data));
                blogPost = new post(data.blogId, data.author, data.text, data.tags);
            }).then(i => {
                suorita = false;
                nayta = true;
                this.setState({id: ids});
            });
        }
        if(nayta) {
            let tagsTexts = blogPost.getTags();
            return (<div>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        {blogPost.getText()}
                    </Grid>
                    <Grid item xs={4}>
                        <h2>Author: {blogPost.getAuthor()}</h2>
                        <br/>
                        {/* open modify view */}
                        <IconButton color="primary" aria-label="modify" onClick={() => {
                            //send information of id
                            handleClickOpen();
                        }}>
                            <SettingsIcon />
                        </IconButton>
                        <br/>
                        {/* delete post from backend */}
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                utils.prototype.removePost(blogPost.getID());
                                setTimeout(() => {
                                    window.location.assign("../deletion");
                                }, 1000);
                            }}
                            startIcon={<DeleteIcon />}
                        >
                            Delete
                        </Button>
                        <br />
                        <br />
                        <h3>Tags:</h3>
                        <br/>
                        <Paper className={classes.root}>
                            {
                                tagsTexts.map((data) =>{
                                    return(<Chip label={data.tagId}/>);
                                })
                            }
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Button variant="contained" color="primary" onClick={handleClickOpenComment}>
                        Add new comment
                    </Button>
                </Grid>
                {/* post modify */}
                <Dialog open={this.state.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Modify this blog post</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="modifyAuthor"
                            label="Author"
                            defaultValue={authorOut}
                            onChange={event => {
                                //when value change then update value of variable
                                authorOut = event.target.value;
                            }}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            multiline
                            id="modifyText"
                            label="Text"
                            defaultValue={textOut}
                            onChange={event => {
                                //when value change then update value of variable
                                textOut = event.target.value;
                            }}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="modifyTags"
                            label="Tags"
                            onChange={event => {
                                let valiaikainen = event.target.value;
                                tags = valiaikainen.split(",");
                            }}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose2} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleClose} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* comment adding */}
                <Dialog open={this.state.comment} onClose={handleCloseComment} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add new comment</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="authorcomment"
                            label="Author"
                            onChange={event => {
                                let valiaikainen = event.target.value;
                                commentAuthor = valiaikainen;
                            }}
                            fullWidth
                            />
                        <TextField
                            margin="dense"
                            id="textcomment"
                            label="Text"
                            onChange={event => {
                                let valiaikainen = event.target.value;
                                commentText = valiaikainen;
                            }}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose2Comment} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleCloseComment} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>);
        } else{
            return (<div><h1>Downloading...</h1></div>);
        }
    }
}