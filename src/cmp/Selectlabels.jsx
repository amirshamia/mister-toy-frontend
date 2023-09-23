import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function SelectLabels({handleChange,sortBy}) {
  const [age, setAge] = React.useState('');

 

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={sortBy}
          label="Sort"
          onChange={handleChange}
          name="sortBy"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="createdAt">Time</MenuItem>

        </Select>
        <FormHelperText>Sort your toys</FormHelperText>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>

      </FormControl>
    </div>
  );
}
