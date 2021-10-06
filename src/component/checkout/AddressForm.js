import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function AddressForm() {
    const [nama,setNama]=React.useState('')
    const [Addres,setAddres]=React.useState('')
    const [city,setCity]=React.useState('')
    const [province,setProvince]=React.useState('')
    const [zip,setZip]=React.useState('')
    

    
    function onChange(e){
        console.log(e.target.name+' target '+e.target.value)
        if(e.target.name==='Name'){
            setNama(e.target.value)
            localStorage.setItem('name',nama)
        }
        else if(e.target.name==='address1'){
            setAddres(e.target.value)
            localStorage.setItem('addres',Addres)
        }
        else if(e.target.name==='city'){
            setCity(e.target.value)
            localStorage.setItem('city',city)
        }
        else if(e.target.name==='state'){
            setProvince(e.target.value)
            localStorage.setItem('province',province)
        }
        else if(e.target.name==='zip'){
            setZip(e.target.value)
            localStorage.setItem('zip',zip)
        }

    }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Name"
            name="Name"
            label="name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line"
            fullWidth
            autoComplete="shipping address-line1"
            onChange={onChange}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            onChange={onChange}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            onChange={onChange}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            onChange={onChange}
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        </Grid>
        <Grid item xs={12}>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}