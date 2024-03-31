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
  const { admins, onSubmit } = props;
  const navigate = useNavigate();
  const [showAdd, setShowAdd] = useState(false);
  const [validationSchema] = useState(
    Yup.object().shape({
      email: Yup.string()
        .email('Debe ser un email valido')
        .required('Requerido'),
      roles: Yup.string(),
      password: Yup.string().required('Requerido'),
      dateTime: Yup.date(),
      name: Yup.string().required('Requerido'),
      surName: Yup.string().required('Requerido'),
      salt: Yup.number(),
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
                {/* <div className="col-6">
                    <AppSelect
                      title="Rol"
                      placeholder="Rol"
                      value={values.roles}
                      onChange={(v) => setFieldValue('roles', v)}
                      error={errors.roles}
                      helperText={errors.roles}
                    />
                  </div> */}
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
                {/* <div className="col-6">
                    <AppDatePicker
                      title="Fecha"
                      placeholder="Fecha"
                      value={values.dateTime}
                      onChange={(v) => setFieldValue('dateTime', v)}
                      error={errors.dateTime}
                      helperText={errors.dateTime}
                    />
                  </div> */}
              </div>
              {/* <div className="row mb-3">
                  <div className="col-6">
                    <AppNumber
                      title="Salt"
                      placeholder="Salt"
                      value={values.salt}
                      onChange={(v) => setFieldValue('salt', v)}
                      error={errors.salt}
                      helperText={errors.salt}
                    />
                  </div>
                </div> */}
            </AppModal>
          </Form>
        )}
      </Formik>
    </>
  );
}
