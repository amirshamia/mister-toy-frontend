import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext({value}) {
  return `${value}$`;
}

export  function RangeSlider({handleChange,rangeValue}) {

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Price range'}
        value={rangeValue}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        name="price"
        min={0}
        max={500}
      />
    </Box>
  );
}
