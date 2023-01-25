import React from 'react';
import Muscular from '../img/Muscular.webp';
import Lean from '../img/Lean.webp';
import Athletic from '../img/Athletic.jpg';
import Bulky from '../img/Bulky.jpg';
import Curvy from '../img/Curvy.webp';
import LeanBulk from '../img/LeanBulk.webp';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import styled from '@emotion/styled';

const Image = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 16px;
`;

export default function BodyType({ selectedBodyType, setSelectedBodyType }) {
  const handleChange = (event) => {
    setSelectedBodyType(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel>Select your desired body type</FormLabel>
      <RadioGroup aria-label="body-type" name="body-type" value={selectedBodyType} onChange={handleChange}>
        <FormControlLabel
          value="Muscular"
          control={<Radio />}
          label={<Image src={Muscular} alt="Muscular body type" />}
        />
        <FormControlLabel
          value="Lean"
          control={<Radio />}
          label={<Image src={Lean} alt="Lean body type" />}
        />
        <FormControlLabel
          value="Athletic"
          control={<Radio />}
          label={<Image src={Athletic} alt="Athletic body type" />}
        />
        <FormControlLabel
          value="Bulky"
          control={<Radio />}
          label={<Image src={Bulky} alt="Bulky body type" />}
        />
        <FormControlLabel
          value="Curvy"
          control={<Radio />}
          label={<Image src={Curvy} alt="Curvy body type" />}
        />
        <FormControlLabel
          value="Lean Bulk"
          control={<Radio />}
          label={<Image src={LeanBulk} alt="Lean Bulk body type" />}
          />
          </RadioGroup>
          </FormControl>
          );
          }