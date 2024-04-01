/* eslint-disable react/prop-types */
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import AppModal from '../../Form/AppModal';
import AppRemixIcons from '../../Icon/AppRemixIcons';
import AppInput from '../../Form/AppInput';
import ProjectDefaultRoute from '../../../../../../src/Routing/ProjectDefaultRoute';
import { useNavigate } from 'react-router-dom';



export default function AdminAdd(props) {
  const { onSubmit } = props;
  const navigate = useNavigate();
  const [showAdd, setShowAdd] = useState(false);
  const [validationSchema] = useState(
    Yup.object().shape({
      email: Yup.string()
        .email('Debe ser un email valido')
        .required('Requerido'),
      roles: Yup.string(),
      dateTime: Yup.date(),
      name: Yup.string().required('Requerido'),
      surname: Yup.string().required('Requerido'),
      password: Yup.string().required('Requerido'),
    })
  );

  const handleAddAdmin = useCallback((payload) => {
    axios
      .put(
        `${ProjectDefaultRoute}/api/admin/add`,
        { payload },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      )
      .then((r) => onSubmit())
      .finally(() => setShowAdd(false))
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
        type="button"
        className="btn btn-outline-secondary d-inline-flex align-items-center"
        onClick={() => setShowAdd(true)}
      >
        <AppRemixIcons icon="ri-user-add-line" />
        Nuevo Usuario
      </button>

      <Formik
        initialValues={{
          email: '',
          password: '',
          name: '',
          surname: '',
        }}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={handleAddAdmin}
      >
        {({ setFieldValue, values, handleSubmit, errors }) => (
          <Form onSubmit={handleSubmit}>
            <AppModal
              target={showAdd}
              onClose={() => setShowAdd(false)}
              title="Nuevo Usuario"
              isCloseButton
              closeButtonText="Cerrar"
              isSuccessButton
              successButtonText="Crear"
              onAccept={handleSubmit}
            >
              <div className="row mb-3">
                <div className="col-6">
                  <AppInput
                    title="Email"
                    placeholder="Email"
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
                    placeholder="Password"
                    value={values.password}
                    onChange={(v) => setFieldValue('password', v)}
                    error={errors.password}
                    helperText={errors.password}
                  />
                </div>
              </div>
            </AppModal>
          </Form>
        )}
      </Formik>
    </>
  );
}
