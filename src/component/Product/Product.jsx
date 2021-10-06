import React from "react";
import Grid from "@material-ui/core/grid";
import Products from "./products/products";
import useStyles from "./styles";
import {Typography} from "@material-ui/core";
import Header from '../Header/Header'
import Avatar from '../Avatar/avatar'

const Product = (item) => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <br/>
      {
             localStorage.getItem('user')!==null?<Avatar/>:null
       }
      <Typography
            variant="h5"
            className={classes.title}
            fontWeight="bold"
          >
            Promo
          </Typography>

      <Header/>
      <br/>
      <Typography
            variant="h5"
            className={classes.title}
            fontWeight="bold"
          >
            Market
          </Typography>
          <br/>
      <Grid container justify="center" spacing={4}>
        
        {item.data?.itemlist.map((e) => {
          return (
            <Grid item key={e.id} xs={12} sm={6} md={4} lg={3}>
              <Products item={e} />
            </Grid>
          );
        })}
      </Grid>
    </main>
  );
};
export default Product;
