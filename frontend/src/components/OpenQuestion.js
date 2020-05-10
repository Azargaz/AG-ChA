import React, { useState, useEffect } from 'react'

import TextField from '@material-ui/core/TextField';

function OpenQuestion(props) {
    const { id, onUpdateAnswer, answer } = props;

    const handleChange = (event) => {
        onUpdateAnswer(id, event.target.value);
    };

    return (
        <div>
            <TextField
                id={"standard-multiline-flexible-"+id}
                fullWidth
                multiline
                value={answer}
                onChange={handleChange}
            />
        </div>
    )
}

export default OpenQuestion
