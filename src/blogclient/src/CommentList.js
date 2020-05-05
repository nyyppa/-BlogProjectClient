import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import commentData from "./commentData";
import utils from "./utils";
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from "@material-ui/core/IconButton";
//some styles
const useStyles2 = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '40vh',
        backgroundColor: theme.palette.background.paper,
        overflowY: 'scroll',
    },
    listaus: {
        listStyleType: 'none',
    },
}));
//comment text
var textOut;
//comment id
var id;
//comment's author
var author;
function CommentList(props){
    const classes2 = useStyles2();
    //comment list
    const lista = props.lista;
    //blog id
    const blogId = props.id;
    //information is admin login
    const userNow = window.sessionStorage.getItem("in");
    const [value, setValue] = React.useState(false);
    const [, forceUpdate] = React.useReducer(x => x + 1, 0);
    //open comment modify
    const handleClickOpen = (index) => {
        id = lista[index].getID();
        textOut = lista[index].getText();
        author = lista[index].getAuthor();
        setValue(true);
    };
    // This call when dialog close
    const handleClose = () => {
        //change comment data from backend
        let apu = new commentData(author,textOut);
        apu.setID(id);
        utils.prototype.changeComment(apu, blogId);
        //load list data again with setTimeout because fetch need time
        setTimeout(() => {
            setValue(false);
            forceUpdate();
        } , 700);
    };
    // This call when dialog close without modify
    const handleClose2 = () => {
        setValue(false);
    };
    let values = [];
    //if admin then show modify options
    if(userNow == "admin") {
        for (let lap = 0; lap < lista.length; lap++) {
            values.push(<li><h5>Author: {lista[lap].getAuthor()}<IconButton color="primary" aria-label="modify"
                                                                            onClick={() => {
                                                                                //send information of id
                                                                                handleClickOpen(lap);
                                                                            }}>
                <SettingsIcon/>
            </IconButton></h5><p>{lista[lap].getText()}</p></li>);
        }
        return (
            <div>
                <div className={classes2.root}>
                    <h2>Comments:</h2>
                    <ul className={classes2.listaus}>
                        {values}
                    </ul>
                </div>
                {/* modify comment */}
                <Dialog open={value} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Modify this blog post</DialogTitle>
                    <DialogContent>
                        <h4>{author}</h4>
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
            </div>);
    } else{
        //else not show modify options
        for (let lap = 0; lap < lista.length; lap++) {
            values.push(<li><h5>Author: {lista[lap].getAuthor()}</h5><p>{lista[lap].getText()}</p></li>);
        }
        return (
            <div>
                <div className={classes2.root}>
                    <h2>Comments:</h2>
                    <ul className={classes2.listaus}>
                        {values}
                    </ul>
                </div>
            </div>);
    }
}

export default CommentList;