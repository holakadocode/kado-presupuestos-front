import { Stack, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/es';
import moment from 'moment';

export default function AppDatePicker(props) {
  const { title, value, onChange } = props;
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'es'}>
      <Stack width={'100%'}>
        <DatePicker
          label={title}
          value={value}
          inputFormat="DD/MM/YYYY"
          onChange={(v) => onChange(v.format('DD/MM/YYYY'))}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
