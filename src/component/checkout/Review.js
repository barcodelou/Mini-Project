import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { gql, useSubscription } from "@apollo/client";

const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];

const Nc=localStorage.getItem('Nc')
const Cn=localStorage.getItem('Cn')
const Ex=localStorage.getItem('Ex')
const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: Nc },
  { name: 'Card number', detail: Cn },
  { name: 'Expiry date', detail: Ex },
];

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

export default function Review() {
    const { data: dataCek } = useSubscription(CartOutput, {
        variables: { _eq: localStorage.getItem("user") },
      });
      const { data:datajumlah } = useSubscription(jumlah, {
        variables: { _eq: localStorage.getItem("user") },
      });
    const nama=localStorage.getItem('name')
    const addres=localStorage.getItem('addres')
    const city=localStorage.getItem('city')
    const province=localStorage.getItem('province')
    const zip=localStorage.getItem('zip')
    


    

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {dataCek?.checkout.map((product) => (
          <ListItem key={product.id} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.title} secondary={product.relation} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {datajumlah?.checkout_aggregate.aggregate.sum.price}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{nama}</Typography>
          <Typography gutterBottom>Alamat {addres}, kota {city}, provinsi {province}, zip {zip}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}