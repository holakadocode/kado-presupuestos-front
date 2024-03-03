import { TextField } from '@mui/material';

// title: Nombre que aparecera como titulo
// placeholder: Descripcion de ayuda que aparece al pinchar en el cuadro, antes de introducidr texto
// value: Contenido que aparecera en el cuadro en caso de que tenga valor
// required: si es true, aparece un asterisco junto al titulo indicando que es requerido
// disabled: si es true, apaga el componente para que no se pueda interactuar
// isReadOnly: si es true, solo se visualizara el contenido que se introduzca en el value
// helperText: Texto que aparecera debajo del icono, en tamaño pequeño.
// error: cambia el color a rojo para indicar que hay un problema.
// type="password": hace que el contenido introducido visualice asteriscos
// fullWidth para que muestre todo en horizontal
// color: cambia el color del cuadro y textos. Solo acepta clases de colores (warning, primary, secondary, info, etc...)
// focused: preselecciona dicho input

export default function AppNumber(props) {
  const {
    title,
    placeholder,
    value,
    required,
    disabled,
    helperText,
    error,
    type,
    fullWidth = true,
    isReadOnly = false,
    color,
    focused,
    onChange,
  } = props;

  return (
    <>
      {console.log('value', value)}
      <TextField
        id="outlined-basic"
        variant="outlined"
        label={title}
        placeholder={placeholder}
        value={value}
        required={required}
        disabled={disabled}
        InputProps={{
          readOnly: isReadOnly,
        }}
        helperText={helperText}
        error={error}
        type={type}
        fullWidth={fullWidth}
        color={color}
        focused={focused}
        size="small"
        onChange={(e) =>
          onChange(
            (e.target.value = e.target.value
              .split('')
              .filter((char) =>
                [
                  '0',
                  '1',
                  '2',
                  '3',
                  '4',
                  '5',
                  '6',
                  '7',
                  '8',
                  '9',
                  ',',
                ].includes(char)
              )
              .join(''))
          )
        }
      />
    </>
  );
}
