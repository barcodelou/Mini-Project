import React,{useState} from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import { gql, useQuery, useMutation, useSubscription } from "@apollo/client";
import useStyles from "./styles";

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const delIns = gql`
  mutation MyMutation($_relation: String = "", $_title: String = "") {
    delete_checkout(
      where: { relation: { _eq: $_relation }, title: { _eq: $_title } }
    ) {
      returning {
        title
        price
      }
    }
  }
`;

const Diskon=gql`mutation MyMutation($_eq: Int = 10, $price: Int = 10) {
  update_checkout(where: {id: {_eq: $_eq}}, _set: {price: $price}) {
    returning {
      id
      image
      price
      relation
      title
    }
  }
}`

const CartItem = (props) => {
  const [dataD, { data: datadiskon }] = useMutation(Diskon);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (pembawa) => {

    if(localStorage.getItem('kode')==='TIGA'){
      console.log('true')
      console.log(pembawa.price)
      console.log('----')
      const a=pembawa.price-pembawa.price*0.2
      const a1=Math.round(a)
      console.log('hasil')
      console.log(a)
      dataD({
        variables: {
          _eq: pembawa.id,
          price: a1,
        },
      });
      localStorage.setItem('kode','')
      setOpen(true);
    }
    else if(localStorage.getItem('kode')==='SEPI'){
      console.log('true')
      console.log(pembawa.price)
      console.log('----')
      const a=pembawa.price-pembawa.price*0.1
      const a1=Math.round(a)
      console.log('hasil')
      console.log(a)
      dataD({
        variables: {
          _eq: pembawa.id,
          price: a1,
        },
      });
      localStorage.setItem('kode','')
      setOpen(true);
    }
    else if(localStorage.getItem('kode')==='GASKAN'){
      console.log('true')
      console.log(pembawa.price)
      console.log('----')
      const a=pembawa.price-pembawa.price*0.8
      const a1=Math.round(a)
      console.log('hasil')
      console.log(a)
      dataD({
        variables: {
          _eq: pembawa.id,
          price: a1,
        },
      });
      localStorage.setItem('kode','')
      setOpen(true);
    }
    else{
      alert('Tidak ada kupon')
    }
    
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [delInsert, { data: data2 }] = useMutation(delIns);
  const baseData = {
    diskon: "",

  };
  console.log(delInsert);
  const classes = useStyles();
  const [TempDis,setTempDis] = React.useState(baseData);

  console.log(props.data);
  console.log(props);

  function Delete(del) {
    console.log(del);
    console.log(del.relation);
    console.log(del.title);
    delInsert({
      variables: {
        _relation: del.relation,
        _title: del.title,
      },
    });
  }

 


  return (
    <div>
      <Card>
      <CardMedia
        className={classes.media}
        image={props.data?.image}
        title={props.data?.title}
      />
        
        <cardContent className={classes.cartContent}>
          <Typography varian="h4">{props.data?.title}</Typography>
          <Typography varian="h5">{props.data?.price}</Typography>
        </cardContent>
        <CardActions className={classes.cardActions}>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              type="button"
              color="secondary"
              onClick={() => Delete(props.data)}
            >
              Remove
            </Button>
            <div>
      <Button variant="outlined" onClick={()=>handleClickOpen(props.data)}>
        Diskon
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Diskon</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Bila kode promo yang anda masukan masih berlaku, maka akan muncul dalam layar deskstop anda. Kemudian klik pada menu gunakan sekarang. 
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};
export default CartItem;
