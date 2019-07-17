import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Translate } from 'react-localize-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { changeFormPage, storePaymentData } from '../App/actions';

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  }
}));


export function PaymentForm0({ dispatch }) {
  const classes = useStyles();
  const SignupSchema = Yup.object().shape({
    cardName: Yup.string()
      .min(5, <Translate id="tooShort" />)
      .max(45, <Translate id="tooLong" />)
      .required(<Translate id="required" />),
    cardNumber: Yup.string()
      .min(2, <Translate id="tooShort" />)
      .max(20, <Translate id="tooLong" />)
      .matches(/^(\d{4}[- ]){3}\d{4}|\d{16}$/, <Translate id="cardNumberValidation" />)
      .required(<Translate id="required" />),
    expDate: Yup.string()
      .min(5, <Translate id="tooShort" />)
      .max(5, <Translate id="tooLong" />)
      .matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, <Translate id="creditCardExpiryValid" />)
      .required(<Translate id="required" />),
    cvv: Yup.string() //^[0-9]*$
      .max(3, <Translate id="tooLong" />)
      .min(3, <Translate id = "tooShort" /> )
      .matches(/^[0-9]*$/, <Translate id="numbersAllowed" />)
      .required(<Translate id="required" />)
  });
  const handleBack = () => dispatch(changeFormPage(0));

  return (
    <React.Fragment>
      <Formik
        enableReinitialize
        initialValues={{
          cardName: '',
          cardNumber: '',
          expDate: '',
          cvv: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          dispatch(storePaymentData(values));
          dispatch(changeFormPage(2));
        }}
      >
        {({
          errors, status, touched, isSubmitting, values, handleSubmit, handleChange, isValid, handleBlur
        }) => (

          <Form>
            <Typography variant="h6" gutterBottom>
              <Translate id="paymentMethod" />
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cardName"
                  value={values.cardName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.cardName && touched.cardName}
                  helperText={errors.cardName}
                  label={<Translate id="nameOnCard" />}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cardNumber"
                  value={values.cardNumber}
                  label={<Translate id="cardNumber" />}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.cardNumber && touched.cardNumber}
                  helperText={errors.cardNumber}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="expDate"
                  value={values.expDate}
                  label={<Translate id="expDate" />}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.expDate && touched.expDate}
                  helperText={errors.expDate}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cvv"
                  label="CVV"
                  onChange={handleChange}
                  value={values.cvv}
                  onBlur={handleBlur}
                  error={errors.cvv && touched.cvv}
                  helperText={errors.cvv}
                  fullWidth
                />
              </Grid>
            </Grid>
            <div className={classes.buttons}>
              <Button onClick={handleBack} className={classes.button}><Translate id="back" /></Button>
              <Button variant="contained" disabled={isSubmitting || !isValid} color="primary" type="submit" className={classes.button}><Translate id="next" /></Button>
            </div>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
}
const PaymentForm = connect()(PaymentForm0);
export default PaymentForm;
