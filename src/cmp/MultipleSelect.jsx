import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']



export default function MultipleSelect({ filterBy, handleChange }) {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

 

    return (
        <>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-label-label">labels</InputLabel>
                <Select
                    labelId="demo-multiple-label-label"
                    id="demo-multiple-label"
                    multiple
                    value={filterBy.label}
                    onChange={handleChange}
                    input={<OutlinedInput name="label" />}
                    MenuProps={MenuProps}
                >
              
                    {labels.map((label) => (
                        <MenuItem
                            key={label}
                            value={label}


                        >
                            {label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
}