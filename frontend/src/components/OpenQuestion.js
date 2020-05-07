import React from 'react'

import TextField from '@material-ui/core/TextField';

function OpenQuestion() {
    const [value, setValue] = React.useState('-');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div>
            <TextField
                id="standard-multiline-flexible"
                fullWidth
                multiline
                value={value}
                onChange={handleChange}
            />
        </div>
    )
}

export default OpenQuestion
