import React from 'react';
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

var help;
var lista = [];
lista.push(new post(1,"master","eka"));
lista.push(new post(2, "kalle", "toka"));
lista.push(new post(3, "master", "kolmas"));
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

function renderRow(props) {
    const { index} = props;

    return (
        <ListItem key={index}>
            <ListItemText primary={`${lista[index].getText()}`} />
            <ListItemText primary={`Author: ${lista[index].getAuthor()}`} />
            <ListItemSecondaryAction>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        utils.prototype.removePost(lista[index].getID());
                        lista.splice(index,1);

                    }}
                    startIcon={<DeleteIcon />}
                >
                    Delete
                </Button>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
};
function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
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
    help = this;
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
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => {
                                                        utils.prototype.removePost(lista[index].getID());
                                                        lista.splice(index,1);
                                                        this.forceUpdate();
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
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
        </div>);

}

export default App;
