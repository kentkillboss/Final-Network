import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import InputField from 'Components/Form-Controls/InputField';
import QuantityField from 'Components/Form-Controls/QuantityFiled';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { showMiniCart } from 'Features/Cart/cartSlice';

AddToCartForm.propTypes = {
  onSubmit: PropTypes.object,
};

function AddToCartForm({ onSubmit = null }) {
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required('Please enter quantity')
      .min(1, 'Minimun value is 1')
      .typeError('Please enter a number'),
  });
  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  const handleClickAddToCart = () => {
    const action = showMiniCart();
    dispatch(action);
  };
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
      <QuantityField name="quantity" label="Quantity" form={form} />
      <Button type="submit" fullWidth variant="contained" color="primary" size="large" onClick={handleClickAddToCart}>
        Add To Cart
      </Button>
    </form>
  );
}

export default AddToCartForm;
