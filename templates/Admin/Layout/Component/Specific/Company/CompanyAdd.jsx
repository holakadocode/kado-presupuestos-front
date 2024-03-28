/* eslint-disable react/prop-types */
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import AppModal from '../../Form/AppModal';
import AppRemixIcons from '../../Icon/AppRemixIcons';
import AppInput from '../../Form/AppInput';
import ProjectDefaultRoute from '../../../../src/Routing/ProjectDefaultRoute';

export default function CompanyAdd(props) {
  const { company, onSubmit } = props;
  const [initialValues, setInitialValues] = useState();
  const [validationSchema] = useState(
    Yup.object().shape({
      name: Yup.string().required('Requerido'),
      taxIdentification: Yup.string().required('Requerido'),
      address: Yup.string().required('Requerido'),
      cp: Yup.string().required('Requerido'),
      city: Yup.string().required('Requerido'),
      phone: Yup.string().required('Requerido'),
      email: Yup.string().required('Requerido'),
    })
  );

  const handleAddCompany = useCallback((values) => {
    axios
      .put(`${ProjectDefaultRoute}/api/company/add`, values)
      .then((r) => onSubmit())
      .catch((err) => console.log(err))
      .finally(() => setInitialValues(undefined));
  }, []);

  const getLastCodCompany = useCallback(() => {
    if (company)
      setInitialValues({
        name: '',
        taxIdentification: '',
        address: '',
        cp: '',
        city: '',
        phone: null,
        email: '',
      });
  }, [company]);

  useEffect(() => {
    getLastCodCompany();
  }, []);

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-secondary d-inline-flex align-items-center"
        onClick={() => getLastCodCompany()}
      >
        <AppRemixIcons icon="ri-user-add-line" />
        Añadir datos Compañia
      </button>

      {initialValues && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={handleAddCompany}
        >
          {({ setFieldValue, values, handleSubmit, errors }) => (
            <Form onSubmit={handleSubmit}>
              <AppModal
                target={initialValues}
                onClose={() => setInitialValues(undefined)}
                title="Datos Compañia"
                isCloseButton
                closeButtonText="Cerrar"
                isSuccessButton
                successButtonText="Crear"
                onAccept={handleSubmit}
              >
                <div className="row mb-3">
                  <div className="col-6">
                    <AppInput
                      title="Nombre Compañia"
                      placeholder="Nombre Compañia"
                      value={values.name}
                      onChange={(v) => setFieldValue('name', v)}
                      error={errors.name}
                      helperText={errors.name}
                    />
                  </div>
                  <div className="col-6">
                    <AppInput
                      title="CIF"
                      placeholder="CIF"
                      value={values.taxIdentification}
                      onChange={(v) => setFieldValue('taxIdentification', v)}
                      error={errors.taxIdentification}
                      helperText={errors.taxIdentification}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-6">
                    <AppInput
                      title="Dirección Empresa"
                      placeholder="Dirección Empresa"
                      value={values.address}
                      onChange={(v) => setFieldValue('address', v)}
                      error={errors.address}
                      helperText={errors.address}
                    />
                  </div>
                  <div className="col-6">
                    <AppInput
                      title="Codigo Postal"
                      placeholder="Codigo Postal"
                      value={values.cp}
                      onChange={(v) => setFieldValue('cp', v)}
                      error={errors.cp}
                      helperText={errors.cp}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-6">
                    <AppInput
                      title="Ciudad"
                      placeholder="Ciudad"
                      value={values.city}
                      onChange={(v) => setFieldValue('city', v)}
                      error={errors.city}
                      helperText={errors.city}
                    />
                  </div>
                  <div className="col-6">
                    <AppInput
                      title="Phone"
                      placeholder="Phone"
                      value={values.phone}
                      onChange={(v) => setFieldValue('phone', v)}
                      error={errors.phone}
                      helperText={errors.phone}
                    />
                  </div>
                </div>

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
                </div>
              </AppModal>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
}
