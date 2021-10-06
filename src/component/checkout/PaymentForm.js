import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function PaymentForm() {
    const [Nc,setNc]=React.useState('')
    const [Cn,setCn]=React.useState('')
    const [Ex,setEx]=React.useState('')
    function onChange(e){
        // if(e.target.name===''){
        //     setNama(e.target.value)
        // }
        console.log(e.target.id)
        console.log(e.target.value)
        if(e.target.id==="cardName"){
            setNc(e.target.value)
            localStorage.setItem('Nc',Nc)
        }
        else if(e.target.id==="cardNumber"){
            setCn(e.target.value)
            localStorage.setItem('Cn',Cn)
        }
        else if(e.target.id==="expDate"){
            setEx(e.target.value)
            localStorage.setItem('Ex',Ex)
        }



    }


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            onChange={onChange}
            variant="standard"
            type="number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            onChange={onChange}
            autoComplete="cc-number"
            variant="standard"
            type="number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            onChange={onChange}
            autoComplete="cc-exp"
            variant="standard"
            type="date"
          />
        </Grid>
        <Grid item xs={12} md={6}>
        </Grid>
        <Grid item xs={12}>
        
        </Grid>
      </Grid>
    </React.Fragment>
  );
}