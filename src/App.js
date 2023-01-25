import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BodyType from './BodyType/BodyType';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const API_KEY = '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';
const API_ENDPOINT = 'https://api.openai.com/v1/engines/davinci-codex/completions';


const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: 'auto',
    maxWidth: 600,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  form: {
    marginTop: theme.spacing(3),
  },
  formContainer: {
    marginTop: theme.spacing(5),
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

function App() {
  const classes = useStyles();
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [open, setOpen] = useState('');
  const [selectedBodyType, setSelectedBodyType] = useState('');
  const [routineFinal, setRoutineFinal] = useState('Loading...');

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      prompt: `Please provide a gym routine for a ${age} year old person, who is ${height} cm tall and weighs ${weight} kg, and would like to achieve a ${selectedBodyType} body type.`,
      temperature: 0.5,
      max_tokens: 1000
    };
    console.log("input: ", data);
    try {
      const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        }
      });
      const routine = response.data.choices[0].text;
      setRoutineFinal(routine)
      console.log("output: ", routine);
      handleOpen();
    } catch (error) {
      console.error(error);
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };
const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
      {routineFinal !== "Loading..." ? <div>
        <Typography id="modal-description" sx={{ whiteSpace: 'pre-line'}}>
            {routineFinal}
        </Typography>
        </div> :  <div>Loading...</div>}
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ overflow: 'scroll' }}
      >
        <Box sx={style}>
          <Typography id="modal-description" sx={{ whiteSpace: 'pre-line'}}>
            {routineFinal}
          </Typography>
        </Box>
      </Modal> */}
        <Typography variant="h4" align="center" gutterBottom>
        KaisenFIT
        </Typography>
        <Grid container className={classes.formContainer}>
        <Grid item xs={12}>
          <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={3}>
        <Grid item xs={12}>
      <TextField
      label="Weight (kg)"
      value={weight}
      onChange={(event) => setWeight(event.target.value)}
      fullWidth
      />
      </Grid>
      <Grid item xs={12}>
      <TextField
      label="Height (cm)"
      value={height}
      onChange={(event) => setHeight(event.target.value)}
      fullWidth
      />
      </Grid>
      <Grid item xs={12}>
      <TextField
      label="Age"
      value={age}
      onChange={(event) => setAge(event.target.value)}
      fullWidth
      />
      </Grid>
      <Grid item xs={12}>
      <BodyType
                      selectedBodyType={selectedBodyType}
                      setSelectedBodyType={setSelectedBodyType}
                    />
      </Grid>
      </Grid>
        <div className={classes.button}>
          <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleSubmit}>
            Get Routine
          </Button>
        </div>
      </form>
      </Grid>
      </Grid>
      </div>
    </ThemeProvider>
    );
    }
    export default App;