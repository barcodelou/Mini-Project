import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { typography } from "@mui/system";
import { gql, useQuery, useMutation, useSubscription } from "@apollo/client";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";
const CartOutput = gql`
  subscription MySubscription($_eq: String = "") {
    checkout(where: { relation: { _eq: $_eq } }) {
      id
      image
      price
      relation
      title
    }
  }
`;
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


const Cart = () => {

 const [total,setTotal]=useState()
  const classes = useStyles();
  const [CekIsi, SetCekIsi] = useState(false);
  const { data: dataCek } = useSubscription(CartOutput, {
    variables: { _eq: localStorage.getItem("user") },
  });
  const { data:datajumlah } = useSubscription(jumlah, {
    variables: { _eq: localStorage.getItem("user") },
  });

  console.log("brapa");
  console.log(dataCek?.checkout.length);
  const akun = localStorage.getItem("user");
  useEffect(() => {
    if (
      localStorage.getItem("user") === "" ||
      localStorage.getItem("user") === null ||
      dataCek?.checkout.length == 0
    ) {
      SetCekIsi(false);
      console.log("false");
    } else {
      SetCekIsi(true);
      console.log("jumlah");
      console.log(datajumlah);
    }
  }, [akun]);
  useEffect(()=>{
    console.log('fix')
    console.log(datajumlah?.checkout_aggregate.aggregate.sum.price)
  setTotal(datajumlah?.checkout_aggregate.aggregate.sum.price)},[datajumlah])
  const EmptyCart = () => {
    return (
      <Typography variant="subtitle1">
        {" "}
        Item Tidak ada
        <br/>
        <Link to="/" className={classes.link}>
          Tambah CheckOutmu yuk
        </Link>
        !
      </Typography>
    );
  };
  const FilledCart = () => {
    return (
      <>
        <Grid container spacing={3}>
          {dataCek?.checkout.map((e) => {
            console.log(e);
            return (
              <Grid item xs={12} sm={4} key={e.id}>
                <div>
                  {e.title}
                  <CartItem data={e} />
                </div>
              </Grid>
            );
          })}
        </Grid>
        <div className={classes.cardDetails}>
          <Typography variant="h4">sub total:{total}</Typography>
          <div>
            <Button
            component={Link}
            to="/cek"
              className={classes.checkoutButton}
              size="larger"
              type="button"
              variant="contained"
              color="primary"
            >
              Check out
            </Button>
          </div>
        </div>
      </>
    );
  };
  return (
    <Container>
      <h1>cek</h1>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h5">
        Check out barang
      </Typography>
      <br/>
      {CekIsi ? <FilledCart /> : <EmptyCart />}
    </Container>
  );
};

export default Cart;
