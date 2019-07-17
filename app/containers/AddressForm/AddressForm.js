import React from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import { Translate } from 'react-localize-redux';
import {
  Formik, Form, Field, ErrorMessage
} from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { changeFormPage, storeAddressData } from '../App/actions';

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  group: {
    margin: theme.spacing(1, 0),
  },
  iceCreamSwitch: {
    marginTop: theme.spacing(4)
  }
}));
const AddressForm0 = ({ dispatch, addressForm, props }) => {
  const classes = useStyles();
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, <Translate id="tooShort" />)
      .max(20, <Translate id="tooLong" />)
      .required(<Translate id="required" />),
    lastName: Yup.string()
      .min(2, <Translate id="tooShort" />)
      .max(20, <Translate id="tooLong" />)
      .required(<Translate id="required" />),
    status: Yup.string()
      .oneOf(['single', 'married'])
      .required(<Translate id="required" />),
    gender: Yup.string()
      .oneOf(['male', 'female'])
      .required(<Translate id="required" />),
    address1: Yup.string()
      .min(2, <Translate id="tooShort" />)
      .max(50, <Translate id="tooLong" />)
      .required(<Translate id="required" />),
    email: Yup.string()
      .email('Add Valid Email Address')
      .max(30, <Translate id="tooLong" />)
      .min(8, <Translate id="tooShort" />)
      .required(<Translate id="required" />)
      .test(
        'is-free',
        '${value} is already registred!',
        (value) => new Promise((res, rej) => {
          // ASYNC VALIDATION
          setTimeout(() => res(value !== 'test@test.com'));
        })),
    password: Yup.string()
      .max(15, <Translate id="tooLong" />)
      .min(8, <Translate id="tooShort" />)
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, <Translate id="passwordValidation" />)
      .required(<Translate id="required" />),
    city: Yup.string()
      .min(2, <Translate id="tooShort" />)
      .max(30, <Translate id="tooLong" />)
      .required(<Translate id="required" />),
    state: Yup.string()
      .min(2, <Translate id="tooShort" />)
      .max(30, <Translate id="tooLong" />)
      .required(<Translate id="required" />),
    zip: Yup.number()
      .integer(<Translate id="tooShort" />)
      .required(<Translate id="required" />),
    country: Yup.string()
      .min(2, <Translate id="tooShort" />)
      .max(30, <Translate id="tooLong" />)
      .required(<Translate id="required" />),
    saveAddress: Yup.boolean()
      .oneOf([true], 'Must Accept Terms and Conditions')
      .required(<Translate id="required" />),
    likeIceCream: Yup.boolean()
      .oneOf([true], 'Sorry, You must like an Ice cream Anyway')
      .required(<Translate id="required" />)
  });

  return (
    <React.Fragment>
      <Formik
        enableReinitialize
        initialValues={{
          firstName: 'Ferko',
          lastName: 'Mrkvicka',
          status: '',
          gender: '',
          likeIceCream: false,
          address1: 'Address 1',
          email: '',
          password: '',
          city: 'Bratislava',
          zip: '9000',
          state: 'Region',
          country: 'Slovakia',
          saveAddress: true
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          /*
             Here we can handle the submission of Address form,
             send it to server etc.
          */
          console.log('submit Fired');
          dispatch(storeAddressData(values));
          dispatch(changeFormPage(1));
        }}
      >
        {({
          errors, status, touched, isSubmitting, values, handleChange, isValid, handleBlur
        }) => (
          <Form>
            <Typography variant="h6" gutterBottom>
              <Translate id="shippingAddress" />
            </Typography>
            <div>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    value={values.firstName}
                    label={<Translate id="firstName" />}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.firstName && touched.firstName}
                    helperText={errors.firstName}
                    autoComplete="fname"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.lastName && touched.lastName}
                    helperText={errors.lastName}
                    label={<Translate id="lastName" />}
                    fullWidth
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <FormLabel required error={errors.status && touched.status} component="legend"><Translate id="status" /></FormLabel>
                  <RadioGroup
                    aria-label="status"
                    name="status"
                    className={classes.group}
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helpertext={errors.status}
                    label={<Translate id="status" />}
                  >
                    <FormControlLabel value="single" control={<Radio />} label={<Translate id="married" />} />
                    <FormControlLabel value="married" control={<Radio />} label={<Translate id="single" />} />
                  </RadioGroup>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <FormLabel required error={errors.gender && touched.gender} component="legend">Gender</FormLabel>
                  <Select
                    native
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helpertext={errors.gender}
                    error={errors.gender && touched.gender}
                    name="gender"
                    id="gender"
                  >
                    <option value="" />
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Select>
                  <Grid className={classes.iceCreamSwitch}>
                    <InputLabel
                      required
                      error={errors.likeIceCream && touched.likeIceCream}
                      htmlFor="likeIceCream"
                    >
                      <Translate id="likeIceCream" />
                    </InputLabel>
                    <Switch
                      checked={values.likeIceCream}
                      value={values.likeIceCream}
                      onChange={handleChange}
                      id="likeIceCream"
                      name="likeIceCream"
                      onBlur={handleBlur}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address1"
                    name="address1"
                    value={values.address1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.address1 && touched.address1}
                    helperText={errors.address1}
                    label={<Translate id="address1" />}
                    fullWidth
                    autoComplete="billing address-line1"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="email"
                    name="email"
                    label={<Translate id="email" />}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email && touched.email}
                    helperText={errors.email}
                    fullWidth
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="password"
                    name="password"
                    type="password"
                    label={<Translate id="password" />}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.password && touched.password}
                    helperText={errors.password}
                    fullWidth
                    autoComplete="password"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label={<Translate id="city" />}
                    error={errors.city && touched.city}
                    helperText={errors.city}
                    fullWidth
                    autoComplete="billing address-city"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    value={values.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.state && touched.state}
                    helperText={errors.state}
                    label={<Translate id="state" />}
                    fullWidth
                    autoComplete="billing address-state"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zip"
                    name="zip"
                    value={values.zip}
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label={<Translate id="postalCode" />}
                    error={errors.zip && touched.zip}
                    helperText={errors.zip}
                    fullWidth
                    autoComplete="billing postal-code"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="country"
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.country && touched.country}
                    helperText={errors.country}
                    label={<Translate id="country" />}
                    fullWidth
                    autoComplete="billing country"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    error="ubelieveble"
                    control={(
                      <Checkbox
                        required
                        color="secondary"
                        name="saveAddress"
                        id="saveAddress"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultChecked={values.saveAddress}
                      />
                    )}
                    label={<Translate id="paymentDetails" />}
                  />
                  {
                    (errors.saveAddress && touched.saveAddress) && (
                      <InputLabel
                        error={errors.saveAddress && touched.saveAddress}
                        htmlFor="saveAddress"
                      >
                        <Translate id="required" />
                      </InputLabel>
                    )
                  }
                </Grid>
                <Grid item xs={12}>

                </Grid>
              </Grid>
            </div>
            <div className={classes.buttons}>
              <Button
                className={classes.button}
                component={Link}
                to="/"
              >
                <Translate id="back" />
              </Button>
              <Button
                variant="contained"
                disabled={isSubmitting} // isSubmitting || !isValid
                color="primary"
                type="submit"
                className={classes.button}
              ><Translate id="next" />
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({ addressForm: state.global.addressForm });
const AddressForm = connect(mapStateToProps)(AddressForm0);
export default AddressForm;
