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
import Button from '@material-ui/core/Button';
import utils from "./utils";
import TextField from "@material-ui/core/TextField";
import Center from 'react-center';
import SaveIcon from '@material-ui/icons/Save';
import SearchIcon from '@material-ui/icons/Search';
import BlogList from "./BlogList";
import SearchView from "./SearchView";

var lista = [];
var suorita = true;
//text what send when create or modify post
var textOut;
//author what send when create or modify post
var authorOut;
//tags
var tags = [];
//create tabpanel
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
//load data from backend
function load(firstTime, force) {
    if(firstTime){
        fetch("http://localhost:8080/blogs/").then(response => response.json()).then(data => {
            console.log("json: " + JSON.stringify(data));
            for (const item of data) {
                lista.push(new post(item.blogId, item.author, item.text, item.tags));
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
                lista.push(new post(item.blogId, item.author, item.text, item.tags));
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

function App() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [, forceUpdate] = React.useReducer(x => x + 1, 0);
    const userNow = window.sessionStorage.getItem("in");
    //run when mount
    useEffect(() => {
        //check if code is not run before
        if(suorita) {
            load(true, forceUpdate);
        }
    });
    //This handle tab bar change
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    if(userNow == "admin") {
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
                        <Tab label="Show posts" icon={<ViewStreamIcon/>} {...a11yProps(0)} />
                        <Tab label="Add new post" icon={<AddIcon/>} {...a11yProps(1)} />
                        <Tab label="Search" icon={<SearchIcon/>} {...a11yProps(2)}/>
                    </Tabs>
                </AppBar>
                {/* tab of post list */}
                <TabPanel value={value} index={0}>
                    <BlogList lista={lista}/>
                </TabPanel>
                { /* post adding tab */}
                <TabPanel value={value} index={1}>
                    <Center>
                        <form noValidate autoComplete="off">
                            <TextField id="outlinedBasic" label="Author" variant="outlined"
                                       onChange={event => {
                                           //when value change then update value of variable
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
                                           //when value change then update value of variable
                                           textOut = event.target.value;
                                       }}/>
                            <br/>
                            <br/>
                            <TextField id="tags"
                                       label="Tags"
                                       variant="outlined"
                                       onChange={event => {
                                           let valiaikainen = event.target.value;
                                           tags = valiaikainen.split(",");
                                       }}
                            />
                            <br/>
                            <br/>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<SaveIcon/>}
                                onClick={() => {
                                    utils.prototype.addNewPost(authorOut, textOut, tags);
                                    // need set timeout so fetch run before list load again
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
                <TabPanel value={value} index={2}>
                    <SearchView/>
                </TabPanel>
            </div>);
    } else{
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
                        <Tab label="Show posts" icon={<ViewStreamIcon/>} {...a11yProps(0)} />
                        <Tab label="Search" icon={<SearchIcon/>} {...a11yProps(2)}/>
                    </Tabs>
                </AppBar>
                {/* tab of post list */}
                <TabPanel value={value} index={0}>
                    <BlogList lista={lista}/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <SearchView/>
                </TabPanel>
            </div>);
    }

}

export default App;
