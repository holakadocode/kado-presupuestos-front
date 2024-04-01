import axios from 'axios';
import { useCallback, useState } from 'react';
import * as Yup from 'yup';
import AppRemixIcons from '../../Icon/AppRemixIcons';
import { Form, Formik } from 'formik';
import AppModal from '../../Form/AppModal';
import AppInput from '../../Form/AppInput';
import ProjectDefaultRoute from '../../../../../../src/Routing/ProjectDefaultRoute';
import { useNavigate } from 'react-router-dom';


export default function UserEdit(props) {
  const { admin, onSubmit } = props;
  const navigate = useNavigate();
  const [showEditAdmin, setShowEditAdmin] = useState(false);
  const [validationSchema] = useState(
    Yup.object().shape({
      email: Yup.string()
        .email('Debe ser un email valido')
        .required('Requerido'),
      roles: Yup.string(),
      dateTime: Yup.date(),
      name: Yup.string().required('Requerido'),
      surname: Yup.string().required('Requerido'),
    })
  );
  const handleAdminEdit = useCallback(
    (payload) => {
      axios
        .post(
          `${ProjectDefaultRoute}/api/admin/edit`,
          { adminID: admin.id, payload },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        )
        .then(() => {
          onSubmit();
        })
        .finally(() => setShowEditAdmin(false))
        .catch((errors) => {
          console.log(errors);
          if (errors.response?.status === 401) {
            localStorage.removeItem('authToken', null);
            navigate('/');
          }
        });
    },
    [admin]
  );

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center"
        onClick={() => setShowEditAdmin(true)}
      >
        <AppRemixIcons icon="ri-pencil-line" />
      </button>

      <Formik
        initialValues={{
          email: admin.email,
          password: '',
          name: admin.name,
          surname: admin.surname,
        }}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        // enableReinitialize
        onSubmit={handleAdminEdit}
      >
        {({ setFieldValue, values, handleSubmit, errors }) => (
          <Form onSubmit={handleSubmit}>
            <AppModal
              target={showEditAdmin}
              onClose={() => setShowEditAdmin(undefined)}
              title="Actualizar Usuario"
              isCloseButton
              closeButtonText="Cerrar"
              isSuccessButton
              successButtonText="Actualizar"
              onAccept={handleSubmit}
            >
              <div className="row mb-3">
                <div className="col-6">
                  <AppInput
                    title="Email"
                    placeholder="email"
                    value={values.email}
                    onChange={(v) => setFieldValue('email', v)}
                    error={errors.email}
                    helperText={errors.email}
                  />
                </div>
                <div className="col-6">
                  <AppInput
                    title="Nombre Usuario"
                    placeholder="Nombre Usuario"
                    value={values.name}
                    onChange={(v) => setFieldValue('name', v)}
                    error={errors.name}
                    helperText={errors.name}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <AppInput
                    title="Apellidos"
                    placeholder="Apellidos"
                    value={values.surname}
                    onChange={(v) => setFieldValue('surname', v)}
                    error={errors.surname}
                    helperText={errors.surname}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <AppInput
                    title="Password"
                    placeholder="Si no escribe ninguna contraseña, mantendra la anterior"
                    value={values.password}
                    onChange={(v) => setFieldValue('password', v)}
                    error={errors.password}
                    helperText={errors.password}
                  />
                </div>
              </div>
              <div className="row mb-3"></div>
            </AppModal>
          </Form>
        )}
      </Formik>
    </>
  );
}
