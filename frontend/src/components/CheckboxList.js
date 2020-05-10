import React, { useState, useEffect } from 'react';

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

export default function CheckboxList(props) {
    const classes = useStyles();
    const { data, labelFunction, onChange } = props;
    const [checked, setChecked] = useState([]);

    useEffect(() => {
        onChange(checked);
    }, [checked])

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <div>
            <List className={classes.root}>
                {data.map(element => (
                    <ListItem button onClick={handleToggle(element.id)} key={element.id}>
                        <ListItemIcon>
                            <Checkbox
                                checked={checked.indexOf(element.id) !== -1}
                                tabIndex={-1}
                                disableRipple
                            />
                        </ListItemIcon>
                        <ListItemText primary={labelFunction(element)} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}