import React from 'react';
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
})((props) => <Radio color="default" {...props} />);

const RedRadio = withStyles({
    root: {
      color: red[400],
      '&$checked': {
        color: red[600],
      },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

function ClosedQuestion() {
    const [selectedValue, setSelectedValue] = React.useState('Nie mam zdania');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div>
        <Tooltip title="Nie">
            <RedRadio
                checked={selectedValue === 'Nie'}
                onChange={handleChange}
                value="Nie"
                name="radio-button-demo"
            />
        </Tooltip>
        <Tooltip title="Raczej nie">
            <RedRadio
                checked={selectedValue === 'Raczej nie'}
                onChange={handleChange}
                value="Raczej nie"
                name="radio-button-demo"
            />
        </Tooltip>
        <Tooltip title="Nie mam zdania">
            <Radio
                checked={selectedValue === 'Nie mam zdania'}
                onChange={handleChange}
                value="Nie mam zdania"
                name="radio-button-demo"
            />
        </Tooltip>
        <Tooltip title="Raczej tak">
            <GreenRadio
                checked={selectedValue === 'Raczej tak'}
                onChange={handleChange}
                value="Raczej tak"
                name="radio-button-demo"
            />
        </Tooltip>
        <Tooltip title="Tak">
            <GreenRadio
                checked={selectedValue === 'Tak'}
                onChange={handleChange}
                value="Tak"
                name="radio-button-demo"
            />
        </Tooltip>
      </div>
    );
}

export default ClosedQuestion;