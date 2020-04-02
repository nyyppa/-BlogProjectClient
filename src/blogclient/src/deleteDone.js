import React from 'react';
import Center from 'react-center';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
export default class DeleteDone extends React.Component{
    render() {
        const classes = makeStyles((theme) => ({
            root: {
                '& > *': {
                    margin: theme.spacing(1),
                },
            },
        }));
        return(
            <Center>
                <div>
            <h1 style={{ color: 'green' }}>Delete done</h1>
                <br/>
                <Center className={classes.root}>
                <Button variant="contained" onClick={() =>{
                    window.location.assign("../");
                }} color="primary">Ok</Button>
                </Center>
                </div>
            </Center>
        );
    }
}