import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Translate } from "react-localize-redux";
import { changeFormPage } from '../App/actions';

const products = [];
const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  }
}));

export function Review({
  addressForm,
  paymentForm,
  dispatch
}) {
  const classes = useStyles();
  console.log(addressForm)
  const handleBackToPayment = () => dispatch(changeFormPage(1));
  const handleNext = () => dispatch(changeFormPage(3));

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map(product => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            $0
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{addressForm.firstName} {addressForm.lastName}</Typography>
          <Typography gutterBottom>{addressForm.address1}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
                <Grid item xs={6}>
                  <Typography gutterBottom>Card Holder</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{paymentForm.cardName}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Card Number</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{paymentForm.cardNumber.substring(0,2)+'** **** **** ****'}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Card Exp. Date</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{paymentForm.expDate}</Typography>
                </Grid>
          </Grid>
        </Grid>
      </Grid>
            <div className={classes.buttons}>
              <Button onClick={handleBackToPayment} className={classes.button}><Translate id="back"/></Button>
              <Button onClick={handleNext} variant="contained" color="primary" className={classes.button}><Translate id="next" /></Button>
            </div>
    </React.Fragment>
  );
}


const mapStateToProps = function (state) {
  console.log(state); // state
  return {
    paymentForm: state.global.paymentForm,
    addressForm: state.global.addressForm
  };
};

export default connect(mapStateToProps)(Review);
