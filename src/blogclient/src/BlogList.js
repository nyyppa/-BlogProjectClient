import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import AutoSizer from "react-virtualized-auto-sizer";
import {FixedSizeList} from "react-window";
import ListItem from "@material-ui/core/ListItem";
import Box from "@material-ui/core/Box";
import ListItemText from "@material-ui/core/ListItemText";

//how many char show in view of one post
var maxShowText = 10;
//open blog post
const openBlog = (key) =>{
    window.location.assign("../show/" + key);
};
const useStyles2 = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '85vh',
        backgroundColor: theme.palette.background.paper,
    },
}));
function BlogList(props) {
    const classes2 = useStyles2();
    //List of blog posts
    const lista = props.lista;
    return (<div className={classes2.root}>
        <AutoSizer>
            {({height, width}) => (
                <FixedSizeList height={height} width={width} itemSize={500} itemCount={lista.length}>
                    {({ index, style }) => {
                        // list item. index is place of item in list or array
                        let h = lista[index].getText();
                        let o = "";
                        for(let lap=0; lap < maxShowText; lap++){
                            o += h.charAt(lap);
                        }
                        o += "...";
                        let i = lista[index].getID();
                        return (
                            <ListItem key={index} onClick={() => openBlog(i)} style={{cursor: "pointer"}}>
                                <Box width={1}>
                                    <ListItemText primary={o}
                                    >
                                    </ListItemText>
                                </Box>
                            </ListItem>
                        );
                    }}
                </FixedSizeList>
            )}
        </AutoSizer>
    </div>);
}
export default BlogList;