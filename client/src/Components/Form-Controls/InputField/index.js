import { TextField } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disabled } = props;
  const { errors } = form;
  const hasError = errors[name];
  return (
    <Controller
      name={name}
      control={form.control}
      // as={TextField}
      render={({ onChange, onBlur, value, name }) => (
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label={label}
          disabled={disabled}
          error={!!hasError}
          helperText={errors[name]?.message}
          name={name}
          value={form.getValues()[name]}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
    ></Controller>
    // <Controller
    //   // defaultValue={defaultValue}
    //   control={form.control}
    //   name={name}
    //   render={({ onChange, onBlur, value, name }) => (
    //     <TextField
    //       name={name}
    //       margin="normal"
    //       disabled={disabled}
    //       label={label}
    //       fullWidth
    //       onChange={onChange}
    //       variant="outlined"
    //       error={!!hasError}
    //       helperText={errors[name]?.message}
    //       value={form.getValues()[name] || ''}
    //     />
    //   )}
    // ></Controller>
  );
}

export default InputField;
