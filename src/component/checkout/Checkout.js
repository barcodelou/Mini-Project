import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { gql, useMutation,useSubscription } from "@apollo/client";
import { useHistory } from "react-router-dom";

const deleteAll=gql`
mutation MyMutation($_eq: String = "") {
    delete_checkout(where: {_and: {relation: {_eq: $_eq}}}) {
      returning {
        id
        image
        price
        relation
        title
      }
    }
  }`

const insOrder=gql`mutation MyMutation($Cn: Int = 10, $Nc: Int = 10, $alamat: String = "", $id: Int = 10, $jumlah: Int = 10, $kota: String = "", $nama: String = "", $provinsi: String = "", $zip: Int = 10) {
    insert_Order_one(object: {Cn: $Cn, Nc: $Nc, alamat: $alamat, jumlah: $jumlah, kota: $kota, nama: $nama, provinsi: $provinsi, zip: $zip}) {
      Cn

      Nc
      alamat
      jumlah
      kota
      nama
      provinsi
      zip
    }
  }
  `
  const jumlah = gql`
  subscription MySubscription($_eq: String = "") {
    checkout_aggregate(where: {relation: {_eq: $_eq}}) {
      aggregate {
        sum {
          price
        }
      }
    }
  }
  `;

function Copyright() {
    

  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout() {
    let history = useHistory();
    const [deleteAll1, { data: data3 }] = useMutation(deleteAll);
    const { data:datajumlah } = useSubscription(jumlah, {
        variables: { _eq: localStorage.getItem("user") },
      });
    const Nc=localStorage.getItem('Nc')
const Cn=localStorage.getItem('Cn')
const Ex=localStorage.getItem('Ex')
const nama=localStorage.getItem('name')
    const addres=localStorage.getItem('addres')
    const city=localStorage.getItem('city')
    const province=localStorage.getItem('province')
    const zip=localStorage.getItem('zip')
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const [order, { data: data2 }] = useMutation(insOrder);
  function onClick(){
      if(localStorage.getItem('Nc')!==null||localStorage.getItem('Nc')!==''){
        order({
            variables:{ 
                nama: nama,
                provinsi:province,
                zip:zip ,
                Cn:Cn,
                Nc:Nc,
               kota:city,
               alamat:addres,
               jumlah:datajumlah?.checkout_aggregate.aggregate.sum.price,
            }
        })
        localStorage.setItem('Nc','')
        localStorage.setItem('Cn','')
        localStorage.setItem('Ex','')
        localStorage.setItem('name','')
        localStorage.setItem('addres','')
            localStorage.setItem('city','')
            localStorage.setItem('province','')
            localStorage.setItem('zip','')
            deleteAll1({
                variables:{
                    _eq:localStorage.getItem('user')
                }
            })
          
            history.push("/");

      }
      else{
          alert('data kosong')
      }
      
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                 We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
                <Button color="primary" onClick={onClick}> Thanks</Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}