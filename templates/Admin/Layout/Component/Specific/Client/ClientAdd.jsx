/* eslint-disable react/prop-types */
import axios from 'axios';
import { Form, Formik } from 'formik';
import AppRemixIcons from '../../Icon/AppRemixIcons';
import AppModal from '../../Form/AppModal';
import AppInput from '../../Form/AppInput';
import AppNumber from '../../Form/AppNumber';
import { useCallback, useState } from 'react';
import * as Yup from 'yup';
import ProjectDefaultRoute from '../../../../../../src/Routing/ProjectDefaultRoute';
import { useNavigate } from 'react-router-dom';

export default function ClientAdd(props) {
  const { onSubmit } = props;
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [validationSchema] = useState(
    Yup.object().shape({
      name: Yup.string().required('Requerido'),
      surname: Yup.string().required('Requerido'),
      taxIdentification: Yup.string().required('Requerido'),
      tlf: Yup.number().required('Requerido'),
      contactEmail: Yup.string().required('Requerido'),
      address: Yup.string().required('Requerido'),
      cp: Yup.number().required('Requerido'),
      city: Yup.string().required('Requerido'),
      // primaryKey: Yup.string().required('Requerido'),
    })
  );

  const handleAddClient = useCallback((values, { resetForm }) => {
    axios
      .put(
        `${ProjectDefaultRoute}/api/client/add`,
        { values },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      )
      .then((r) => {
        onSubmit();
        resetForm();
      })
      .finally(() => setShowModal(false))
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
        onClick={() => setShowModal(true)}
      >
        <AppRemixIcons icon="ri-user-add-line" />
        Nuevo Cliente
      </button>

      <Formik
        initialValues={{
          name: '',
          surname: '',
          taxIdentification: '',
          tlf: '',
          contactEmail: '',
          address: '',
          cp: '',
          city: '',
          primaryKey: 'holaKase',
        }}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize
        onSubmit={handleAddClient}
      >
        {({ setFieldValue, values, handleSubmit, errors }) => (
          <Form onSubmit={handleSubmit}>
            <AppModal
              target={showModal}
              onClose={() => setShowModal(false)}
              title="Nuevo Cliente"
              isCloseButton
              closeButtonText="Cerrar"
              isSuccessButton
              successButtonText="Alta"
              onAccept={handleSubmit}
            >
              <div className="row mb-3">
                <div className="col-5">
                  <AppInput
                    title="NIF o CIF"
                    placeholder="taxIdentification"
                    value={values.taxIdentification}
                    required={true}
                    onChange={(v) => setFieldValue('taxIdentification', v)}
                    error={errors.taxIdentification}
                    helperText={errors.taxIdentification}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-5">
                  <AppInput
                    title="Nombre"
                    placeholder="Nombre"
                    value={values.name}
                    required
                    onChange={(v) => setFieldValue('name', v)}
                    error={errors.name}
                    helperText={errors.name}
                  />
                </div>
                <div className="col-7">
                  <AppInput
                    title="Apellidos"
                    placeholder="Apellidos"
                    value={values.surname}
                    required
                    onChange={(v) => setFieldValue('surname', v)}
                    error={errors.surname}
                    helperText={errors.surname}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-5">
                  <AppNumber
                    title="Teléfono"
                    placeholder="Teléfono"
                    value={values.tlf}
                    required
                    onChange={(v) => setFieldValue('tlf', v)}
                    error={errors.tlf}
                    helperText={errors.tlf}
                  />
                </div>
                <div className="col-7">
                  <AppInput
                    title="Email"
                    placeholder="Email de contacto"
                    value={values.contactEmail}
                    required
                    onChange={(v) => setFieldValue('contactEmail', v)}
                    error={errors.contactEmail}
                    helperText={errors.contactEmail}
                  />
                </div>
              </div>
              <div className="mb-3">
                <AppInput
                  title="Dirección"
                  placeholder="Dirección"
                  value={values.address}
                  required
                  onChange={(v) => setFieldValue('address', v)}
                  error={errors.address}
                  helperText={errors.address}
                />
              </div>
              <div className="row mb-3">
                <div className="col-4">
                  <AppNumber
                    title="CP"
                    placeholder="Código postal"
                    value={values.cp}
                    required
                    onChange={(v) => setFieldValue('cp', v)}
                    error={errors.cp}
                    helperText={errors.cp}
                  />
                </div>
                <div className="col-8">
                  <AppInput
                    title="Ciudad"
                    placeholder="Ciudad"
                    value={values.city}
                    required
                    onChange={(v) => setFieldValue('city', v)}
                    error={errors.city}
                    helperText={errors.city}
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
