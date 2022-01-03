import { Radio } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

RadioField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function RadioField(props) {
  const { form, name } = props;
  return (
    <Controller
      rules={{ required: true }}
      control={form.control}
      defaultValue="nam"
      name={name}
      render={({ name, onBlur, onChange, value }) => {
        return (
          <RadioGroup row name={name} value={value} onBlur={onBlur} onChange={onChange}>
            <FormControlLabel value="nam" control={<Radio />} label="Nam" />
            <FormControlLabel value="nữ" control={<Radio />} label="Nữ" />
            <FormControlLabel value="khác" control={<Radio />} label="Khác" />
          </RadioGroup>
        );
      }}
    />
  );
}

export default RadioField;
