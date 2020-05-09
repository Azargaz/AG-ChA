import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
      },
}));

export default function CheckboxList() {
    const classes = useStyles();

    const [checked, setChecked] = React.useState(false);

    const handleToggle = value => () => {
        setChecked(!value);
    };

    return (
        <div>
            <List className={classes.root}>
                {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(element => (
                    <ListItem button onClick={handleToggle(checked)}>
                        <ListItemIcon>
                            <Checkbox
                                checked={checked}
                                tabIndex={-1}
                                disableRipple
                            />
                        </ListItemIcon>
                        <ListItemText primary={`Jan Kowalski ${element}`} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}