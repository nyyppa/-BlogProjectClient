import React, {useEffect} from 'react';
import './App.css';
import post from "./post";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import AddIcon from '@material-ui/icons/Add';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import utils from "./utils";
import TextField from "@material-ui/core/TextField";
import Center from 'react-center';
import SaveIcon from '@material-ui/icons/Save';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

var lista = [];
var suorita = true;
var textOut;
var authorOut;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
      <Typography
          component="div"
          role="tabpanel"
          hidden={value !== index}
          id={`scrollable-force-tabpanel-${index}`}
          aria-labelledby={`scrollable-force-tab-${index}`}
          {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

function load(firstTime, force) {
    if(firstTime){
        fetch("http://localhost:8080/blogs/").then(response => response.json()).then(data => {
            console.log("json: " + JSON.stringify(data));
            for (const item of data) {
                lista.push(new post(item.id, item.author, item.text));
            }
            suorita = false;
        }).then(i => {
            console.log(lista.length);
            force();
        });
    } else{
        fetch("http://localhost:8080/blogs/").then(response => response.json()).then(data => {
            console.log("json: " + JSON.stringify(data));
            lista = [];
            for (const item of data) {
                lista.push(new post(item.id, item.author, item.text));
            }
        }).then(i => {
            console.log(lista.length);
            force();
        });
    }
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));
const useStyles2 = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '85vh',
        backgroundColor: theme.palette.background.paper,
    },
}));
function App() {
    const classes = useStyles();
    const classes2 = useStyles2();
    const [value, setValue] = React.useState(0);
    const [, forceUpdate] = React.useReducer(x => x + 1, 0);
    const [open, setOpen] = React.useState(false);
    const [paikka, setPaikka] = React.useState(1);
    //This call when dialog want open
    const handleClickOpen = (key) => {
        setPaikka(key);
        setOpen(true);
    };
    // This call when dialog close
    const handleClose = () => {
        //change post data from backend
        utils.prototype.addPost((paikka + 1), authorOut, textOut);
        //load list data again
        load(false, forceUpdate);
        setOpen(false);
    };
    useEffect(() => {
        if(suorita) {
            load(true, forceUpdate);
        }
    });
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable force tabs example"
                >
                    <Tab label="Show posts" icon={<ViewStreamIcon />} {...a11yProps(0)} />
                    <Tab label="Add new post" icon={<AddIcon />} {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <div className={classes2.root}>
                    <AutoSizer>
                        {({height, width}) => (
                            <FixedSizeList height={height} width={width} itemSize={200} itemCount={lista.length}>
                                {({ index, style }) => {
                                    return (
                                        <ListItem key={index}>
                                            <ListItemText primary={`${lista[index].getText()}`} />
                                            <ListItemText primary={`Author: ${lista[index].getAuthor()}`} />
                                            <ListItemSecondaryAction>
                                                <IconButton color="primary" aria-label="modify" onClick={() => {
                                                    handleClickOpen(index);
                                                }}>
                                                    <SettingsIcon />
                                                </IconButton>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => {
                                                        utils.prototype.removePost(lista[index].getID());
                                                        setTimeout(() => {
                                                            load(false, forceUpdate);
                                                        }, 500);
                                                    }}
                                                    startIcon={<DeleteIcon />}
                                                >
                                                    Delete
                                                </Button>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    );
                                }}
                            </FixedSizeList>
                        )}
                    </AutoSizer>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Modify this blog post</DialogTitle>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                id="modifyAuthor"
                                label="Author"
                                defaultValue={authorOut}
                                onChange={event => {
                                    authorOut = event.target.value;
                                }}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                id="modifyText"
                                label="Text"
                                defaultValue={textOut}
                                onChange={event => {
                                    textOut = event.target.value;
                                }}
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Center>
                <form noValidate autoComplete="off">
                    <TextField id="outlinedBasic" label="Author" variant="outlined"
                               onChange={event => {
                                   authorOut = event.target.value;
                               }}
                    />
                    <br/>
                    <br/>
                    <TextField id="outlinedMultiline"
                               label="Text"
                               multiline
                               rows="4"
                               variant="outlined"
                               onChange={event => {
                                   textOut = event.target.value;
                               }}/>
                               <br/>
                               <br/>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<SaveIcon />}
                        onClick={ () => {
                            utils.prototype.addNewPost(authorOut, textOut);
                            setTimeout(() => {
                                load(false, forceUpdate);
                            }, 500);
                            }
                        }
                    >
                        Save
                    </Button>
                </form>
                </Center>
            </TabPanel>
        </div>);

}

export default App;
