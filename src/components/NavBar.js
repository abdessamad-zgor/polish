import {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { fade } from '@material-ui/core/styles/colorManipulator';


const styles = makeStyles({
    appbar: {
        color: '#ff8e53',
        backgroundColor: fade('#ff8e53', 0.1),
    },
});

function NavBar() {
    const [value, setValue] = useState(0);
    const handleTab = (event, value) => {
        setValue({value})
    }
    const classes = styles();
    return (
        <AppBar className={classes.appbar} variant="outlined" position="sticky">
            <h3 className="title"> Polish</h3>
            <Tabs
            value={value}
            onChange={handleTab}
            >
                <Tab label="Home" to="/" component={Link}> </Tab>
                <Tab label="Products" to="/products" component={Link}></Tab>
            </Tabs>

        </AppBar>
    )
}

export default NavBar;
