import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';
import { useState } from 'react';

// title: Nombre que aparecera como titulo
// value: Contenido que aparecera en el cuadro en caso de que tenga valor
// required: si es true, aparece un asterisco junto al titulo indicando que es requerido
// disabled: si es true, apaga el componente para que no se pueda interactuar
// isReadOnly: si es true, solo se visualizara el contenido que se introduzca en el value
// helperText: Texto que aparecera debajo del icono, en tamaño pequeño.
// error: cambia el color a rojo para indicar que hay un problema.
// type="password": hace que el contenido introducido visualice asteriscos
// fullWidth para que muestre todo en horizontal
// color: cambia el color del cuadro y textos. Solo acepta clases de colores (warning, primary, secondary, info, etc...)

export default function AppSelect(props) {
  const {
    title,
    value,
    required,
    disabled,
    helperText,
    error,
    fullWidth = false,
    isReadOnly = false,
    color,
    onChange,
    options,
    icon,
    size = 120,
    witdh,
    isMulti = false,
  } = props;
  // poner icono
  return (
    <>
      {isMulti ? (
        <FormControl
          fullWidth={fullWidth}
          sx={{ minWidth: fullWidth ? '' : size, width: witdh }}
          size="small"
          required={required}
          disabled={disabled}
          error={error}
        >
          <InputLabel>{title}</InputLabel>
          <Select
            value={value}
            input={<OutlinedInput label={title} />}
            multiple
            onChange={(e) => onChange(e.target.value)}
            inputProps={{ readOnly: isReadOnly }}
            color={color}
          >
            {options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}{' '}
          </Select>
          <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
      ) : (
        <FormControl
          fullWidth={fullWidth}
          sx={{ minWidth: fullWidth ? '' : size, width: witdh }}
          size="small"
          required={required}
          disabled={disabled}
          error={error}
        >
          <InputLabel>{title}</InputLabel>
          <Select
            label={title}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            inputProps={{ readOnly: isReadOnly }}
            color={color}
          >
            {options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
      )}
    </>
  );
}
