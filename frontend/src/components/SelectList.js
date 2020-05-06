import React from 'react'

import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

// przykład użycia

// const [test, setTest] = React.useState('');

// const handleChange = (event) => {
//     setTest(event.target.value);
// }

/* <SelectList 
    label="Test" 
    idName="id" 
    name="name"
    value={test} 
    itemList={[{"id": "1", "name": "aaaaa"}, {"id": "2", "name": "bbbbbb"}]} 
    loading={false} 
    handleChange={handleChange}
/> */

function SelectList(props) {
    const { label, idName, name, value, itemList, loading, handleChange } = props;

    const labelId = idName + "-select-label";
    const selectId = idName + "-select";

    return (
        <FormControl fullWidth margin="normal">
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
