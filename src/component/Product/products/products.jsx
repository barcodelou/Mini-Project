import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core/";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import { AddShoppingCart } from "@material-ui/icons";
import useStyles from "./styles";
import { gql, useMutation} from "@apollo/client";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const checkout = gql`
mutation MyMutation($price: Int = 10, $title: String = "", $relation: String = "", $image: String = "") {
    insert_checkout_one(object: {price: $price, relation: $relation, title: $title, image: $image}) {
      title
      relation
      price
      image
      id
    }
  }
  
`;


const Products = (item) => {

const [checkOut, { data: datacheck }] = useMutation(checkout);
  const classes = useStyles();
  console.log(item.item);
 

  const addChart=(copy)=>{
    if(localStorage.getItem('user')===""||localStorage.getItem('user')===null){
      alert("eror")
    }
    else{
    console.log("isi copy="+copy);
    checkOut({
      variables:{
        price:copy.price,
        title:copy.title,
        relation: localStorage.getItem('user'),
        image:copy.img
      }
    })
    alert('item dengan nama ('+copy.title+') telah masuk keranjang')
    console.log("hasilcopy")
  }
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={item.item.img}
        title={item.item.title}
      />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography className={classes.itemtitle} variant="h5" gutterBottom>
            {item.item.title}
          </Typography>
          <Typography variant="h5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-currency-dollar"
              viewBox="0 0 16 16"
            >
              <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
            </svg>
            {item.item.price}
          </Typography>
        </div>
        <Typography variant="body2" color="textSecondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-file-person"
            viewBox="0 0 16 16"
          >
            <path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z" />
            <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>{" "}
          Creator : {item.item.descript}
        </Typography>
        <Button color="secondary" onClick={handleClickOpen}>
        Perjelas
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {item.item.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <img
              src={item.item.img}
              alt="my logo"
            />

      </Dialog>
      </CardContent>
      <CardActions
        disableSpacing
        className={classes.cardActions}
        onClick={() => addChart(item.item)}
      >
        <IconButton aria-label="Add chart">
          <AddShoppingCart></AddShoppingCart>
        </IconButton>
      </CardActions>
    </Card>
  );
};
export default Products;
