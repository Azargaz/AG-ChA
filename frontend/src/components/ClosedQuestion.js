import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import Tooltip from '@material-ui/core/Tooltip';

const GreenRadio = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
})(React.forwardRef((props, ref) => <Radio color="default" {...props} innerRef={ref} />));

const RedRadio = withStyles({
    root: {
      color: red[400],
      '&$checked': {
        color: red[600],
      },
    },
    checked: {},
})(React.forwardRef((props, ref) => <Radio color="default" {...props} innerRef={ref} />));

function ClosedQuestion(props) {
    const { id, onUpdateAnswer, answer, disabled } = props;

    const handleChange = (event) => {
        onUpdateAnswer(id, event.target.value);
    };

    return (
        <div>
        <Tooltip title="Nie">
            <RedRadio
                checked={answer === 'Nie'}
                onChange={handleChange}
                value="Nie"
                name="radio-button-demo"
                disabled={disabled}
            />
        </Tooltip>
        <Tooltip title="Raczej nie">
            <RedRadio
                checked={answer === 'Raczej nie'}
                onChange={handleChange}
                value="Raczej nie"
                name="radio-button-demo"
                disabled={disabled}
            />
        </Tooltip>
        <Tooltip title="Nie mam zdania">
            <Radio
                checked={answer === 'Nie mam zdania'}
                onChange={handleChange}
                value="Nie mam zdania"
                name="radio-button-demo"
                disabled={disabled}
            />
        </Tooltip>
        <Tooltip title="Raczej tak">
            <GreenRadio
                checked={answer === 'Raczej tak'}
                onChange={handleChange}
                value="Raczej tak"
                name="radio-button-demo"
                disabled={disabled}
            />
        </Tooltip>
        <Tooltip title="Tak">
            <GreenRadio
                checked={answer === 'Tak'}
                onChange={handleChange}
                value="Tak"
                name="radio-button-demo"
                disabled={disabled}
            />
        </Tooltip>
      </div>
    );
}

export default ClosedQuestion;