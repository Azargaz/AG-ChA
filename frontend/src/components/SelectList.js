import React from 'react'

import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

function SelectList(props) {
    const { label, idName, name, value, itemList, loading, disabled, handleChange } = props;

    const labelId = idName + "-select-label";
    const selectId = idName + "-select";

    return (
        <FormControl fullWidth margin="normal" disabled={loading ? true : disabled}>
            <InputLabel id={labelId}>
                {label}
            </InputLabel>
            <Select 
                key={idName+value}
                labelId={labelId}
                id={selectId}
                name={idName}
                value={value}
                onChange={handleChange}
            >
                {loading ? (
                    <CircularProgress/>
                ) : (
                    itemList.map(item => (
                        <MenuItem key={idName + ":" + item[idName]} value={item[idName]}>{item[name]}</MenuItem>
                    ))
                )}
            </Select>
        </FormControl>
    )
}

export default SelectList
