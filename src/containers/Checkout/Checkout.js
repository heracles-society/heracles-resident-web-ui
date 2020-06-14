import {Button} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import {makeStyles} from '@material-ui/core/styles';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import React from 'react';
import {Redirect} from 'react-router-dom';
import './Checkout.css';

import {paymentOption, otherPaymentOptions} from './paymentName';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export const Checkout = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    ElectricityMaintainance: false,
    Electricity: false,
    Maintainance: false,
    Owner: false,
    Gymnasium: false,
    Pool: false,
    isElectricityMaintainanceDisabled: false,
    isElectricityDisabled: false,
    isMaintainanceDisabled: false,
  });

  const [value, setValue] = React.useState();
  const [redirect, setRedirect] = React.useState(false);
  const isValid = value < 1;

  const handleChange = event => {
    if (
      event.target.name === 'ElectricityMaintainance' &&
      event.target.checked
    ) {
      setState({
        ...state,
        [event.target.name]: event.target.checked,
        isElectricityDisabled: true,
        isMaintainanceDisabled: true,
      });
    } else if (
      event.target.name === 'ElectricityMaintainance' &&
      !event.target.checked
    ) {
      setState({
        ...state,
        [event.target.name]: event.target.checked,
        isElectricityDisabled: false,
        isMaintainanceDisabled: false,
      });
    } else if (
      (event.target.name === 'Electricity' ||
        event.target.name === 'Maintainance') &&
      event.target.checked
    ) {
      setState({
        ...state,
        [event.target.name]: event.target.checked,
        isElectricityMaintainanceDisabled: true,
      });
    } else if (
      event.target.name === 'Electricity' &&
      !state.Maintainance &&
      !event.target.checked
    ) {
      setState({
        ...state,
        [event.target.name]: event.target.checked,
        isElectricityMaintainanceDisabled: false,
      });
    } else if (
      event.target.name === 'Maintainance' &&
      !state.Electricity &&
      !event.target.checked
    ) {
      setState({
        ...state,
        [event.target.name]: event.target.checked,
        isElectricityMaintainanceDisabled: false,
      });
    } else {
      setState({...state, [event.target.name]: event.target.checked});
    }
  };

  const handleBookingCheckout = data => {
    const RAZOR_PAY_TEST_KEY = 'rzp_test_z5pSZeqaHVrIEs';
    const options = {
      key: RAZOR_PAY_TEST_KEY,
      name: 'HERACLES',
      description: 'Booking Request amount for HERACLES',
      order_id: 'order_EyhZkfDF0q5vFF',
      handler: async response => {
        try {
          setRedirect(true);
          setValue(0);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err);
        }
      },
      prefill: {
        name: 'Harshil Mathur',
        email: 'harshil@razorpay.com',
      },
      notes: {
        address: 'Hello World',
      },
      theme: {
        color: '#F37254',
      },
    };
    // window.open('https://rzp.io/l/lqfqTV1');
    const rzp2 = new window.Razorpay(options);
    rzp2.open();
  };

  const orderGeneratedByAdmin = async e => {
    const API_URL = ''; // need to change the url to current mongo instance.
    e.preventDefault();

    const orderUrl = `${API_URL}order`;
    const rawResponse = await fetch(orderUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({bookingAmount: 10}),
    });
    const content = await rawResponse.json();
    return content;
  };
  const paymentHandler = async e => {
    handleBookingCheckout();
  };

  const {
    ElectricityMaintainance,
    Electricity,
    Maintainance,
    Owner,
    Gym,
    Pool,
    isElectricityMaintainanceDisabled,
    isElectricityDisabled,
    isMaintainanceDisabled,
  } = state;

  const getCheckedState = name => {
    switch (name) {
      case 'ElectricityMaintainance':
        return ElectricityMaintainance;
      case 'Electricity':
        return Electricity;
      case 'Maintainance':
        return Maintainance;
      case 'Owner':
        return Owner;
      case 'Gym':
        return Gym;
      case 'Pool':
        return Pool;
      default:
        return '';
    }
  };

  const isCheckboxDisabled = option => {
    switch (option) {
      case 'ElectricityMaintainance':
        return isElectricityMaintainanceDisabled;
      case 'Electricity':
        return isElectricityDisabled;
      case 'Maintainance':
        return isMaintainanceDisabled;
      default:
        return false;
    }
  };

  const renderPaymentOption = paymentOption.map(option => {
    return (
      <FormControlLabel
        key={option.id}
        control={
          <Checkbox
            checked={getCheckedState(option.name)}
            onChange={handleChange}
            name={option.name}
            disabled={isCheckboxDisabled(option.name)}
          />
        }
        label={option.label}
      />
    );
  });

  const renderOtherPaymentOption = otherPaymentOptions.map(option => {
    return (
      <FormControlLabel
        key={option.id}
        control={
          <Checkbox
            checked={getCheckedState(option.name)}
            onChange={handleChange}
            name={option.name}
          />
        }
        label={option.label}
      />
    );
  });

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: '/manage/thankyou',
          content: 'order_EyhZkfDF0q5vFF',
        }}
      />
    );
  }
  return (
    <>
      <h2>Bills and Payments</h2>
      <Button
        color="primary"
        variant="contained"
        onClick={orderGeneratedByAdmin}
      >
        Order Generated By Admin
      </Button>
      <div className={` container ${classes.root}`}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">PAYMENTS</FormLabel>
          <FormGroup>{renderPaymentOption}</FormGroup>
        </FormControl>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">OTHER PAYMENTS</FormLabel>
          <FormGroup>{renderOtherPaymentOption}</FormGroup>
        </FormControl>
      </div>
      {Object.values(state).includes(true) && (
        <div className="payment-container">
          <div className="payment-section">
            <CurrencyTextField
              label="Amount"
              value={value}
              currencySymbol="₹"
              onChange={(e, value) => setValue(value)}
              error={isValid}
              helperText={isValid && 'minimum amount is ₹1'}
              decimalCharacter="."
              digitGroupSeparator=","
            />

            <Button
              color="primary"
              variant="contained"
              style={{position: 'absolute', left: '13rem', top: '1rem'}}
              disabled={isValid || !value}
              onClick={paymentHandler}
            >
              Proceed to pay
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
