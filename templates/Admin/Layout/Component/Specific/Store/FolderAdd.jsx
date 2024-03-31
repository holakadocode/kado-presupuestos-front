import { useCallback, useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import AppRemixIcons from '../../Icon/AppRemixIcons';
import axios from 'axios';
import ProjectDefaultRoute from '../../../../../../src/Routing/ProjectDefaultRoute';
import { useNavigate } from 'react-router';
import AppModal from '../../Form/AppModal';
import AppInput from '../../Form/AppInput';

export default function FolderAdd(props) {
  const { onSubmit } = props;
  const navigate = useNavigate();
  const [validationSchema] = useState(
    Yup.object().shape({
      nameFolder: Yup.string().required('Introduzca un nombre'),
    })
  );

  const [open, setOpen] = useState(false);

  const handleAddFolder = useCallback((payload) => {
    axios
      .put(
        `${ProjectDefaultRoute}/api/storage/add`,
        { payload },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      )
      .then(() => onSubmit())
      .finally(() => setOpen(false))
      .catch((errors) => {
        console.log(errors);
        if (errors.response?.status === 401) {
          localStorage.removeItem('authToken', null);
          navigate('/');
        }
      });
  }, []);

  return (
    <>
      <button
        className="btn btn-outline-secondary d-inline-flex align-items-center"
        onClick={() => setOpen(true)}
      >
        <AppRemixIcons icon="ri-folder-add-line" className="me-2" />
        Nueva Carpeta
      </button>

      <Formik
        initialValues={{
          nameFolder: '',
        }}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(v) => handleAddFolder(v)}
      >
        {({ setFieldValue, values, handleSubmit, errors }) => (
          <Form onSubmit={handleSubmit}>
            <AppModal
              target={open}
              onClose={() => setOpen(false)}
              title="Nueva carpeta"
              isCloseButton
              closeButtonText="Cerrar"
              isSuccessButton
              successButtonText="Crear carpeta"
              onAccept={handleSubmit}
            >
              <AppInput
                title={'Nombre de carpeta'}
                value={values.nameFolder}
                helperText={errors.nameFolder}
                onChange={(v) => setFieldValue('nameFolder', v)}
                error={errors.nameFolder}
              />
            </AppModal>
          </Form>
        )}
      </Formik>
    </>
  );
}
