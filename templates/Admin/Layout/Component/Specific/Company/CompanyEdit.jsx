/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import AppRemixIcons from '../../Icon/AppRemixIcons';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import AppInput from '../../Form/AppInput';
import ProjectDefaultRoute from '../../../../../../src/Routing/ProjectDefaultTemplate';
import { useNavigate } from 'react-router-dom';

export default function CompanyEdit() {
  const [company, setCompany] = useState(false);
  const navigate = useNavigate();
  const [validationSchema] = useState(
    Yup.object().shape({
      name: Yup.string().required('Requerido'),
      taxIdentification: Yup.string().required('Requerido'),
      address: Yup.string().required('Requerido'),
      cp: Yup.string().required('Requerido'),
      city: Yup.string().required('Requerido'),
      phone: Yup.number()
        .typeError('Eso no parece un numero de telefono')
        .positive('No puede ser un numero negativo')
        .integer('No puede contener numeros decimales')
        .required('Numero de telefono es requerido'),
      email: Yup.string()
        .email('Debe ser un email valido')
        .required('Requerido'),
    })
  );

  const getCompany = useCallback(() => {
    axios
      .get(`${ProjectDefaultRoute}/public/index.php/api/company/get`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      .then((r) => {
        setCompany(r.data);
      })
      .catch((errors) => {
        console.log(errors);
        if (errors.response?.status === 401) {
          localStorage.removeItem('authToken', null);
          navigate('/');
        }
      });
  }, [company]);

  useEffect(() => {
    getCompany();
  }, []);

  const handleCompanyEdit = useCallback((payload) => {
    axios
      .post(
        'http://localhost/public/index.php/api/company/edit',
        { payload },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      )
      .then((r) => {})
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
      {company ? (
        <Formik
          initialValues={{
            name: company.name || '',
            taxIdentification: company.taxIdentification || '',
            address: company.address || '',
            cp: company.cp || '',
            city: company.city || '',
            phone: company.phone || '',
            email: company.email || '',
          }}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          // enableReinitialize
          onSubmit={handleCompanyEdit}
        >
          {({ setFieldValue, values, handleSubmit, errors }) => (
            <Form onSubmit={handleSubmit}>
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
              <button
                type="submit"
                className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center"
              >
                <AppRemixIcons icon="ri-pencil-line" />
                Actualizar
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <div>Cargando</div>
      )}
    </>
  );
}
