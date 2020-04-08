import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import AutoSizer from "react-virtualized-auto-sizer";
import {FixedSizeList} from "react-window";
import ListItem from "@material-ui/core/ListItem";
import Box from "@material-ui/core/Box";
import ListItemText from "@material-ui/core/ListItemText";
const useStyles2 = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '44vh',
        backgroundColor: theme.palette.background.paper,
        overflowY: 'scroll',
    },
    listaus: {
        listStyleType: 'none',
    },
}));
function CommentList(props){
    const classes2 = useStyles2();
    const lista = props.lista;
    let values = [];
    for(let lap=0; lap < lista.length; lap++){
        values.push(<li><h5>Author: {lista[lap].getAuthor()}</h5><p>{lista[lap].getText()}</p></li>);
    }
    return (
        <div className={classes2.root}>
            <h2>Comments:</h2>
            <ul className={classes2.listaus}>
                {values}
            </ul>
        </div>);
}

export default CommentList;