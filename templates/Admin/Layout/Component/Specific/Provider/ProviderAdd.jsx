/* eslint-disable react/prop-types */
import { Form, Formik } from 'formik';
import AppModal from '../../Form/AppModal';
import AppRemixIcons from '../../Icon/AppRemixIcons';
import AppNumber from '../../Form/AppNumber';
import AppInput from '../../Form/AppInput';
import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

export default function ProviderAdd(props) {
  const { providers, onSubmit } = props;
  const [initialValues, setInitialValues] = useState();
  const [validationSchema] = useState(
    Yup.object().shape({
      codProvider: Yup.string().required('Requerido'),
      phone: Yup.number().required('Requerido'),
      nameCompany: Yup.string().required('Requerido'),
      businessName: Yup.string().required('Requerido'),
      nif: Yup.string().required('Requerido'),
      contactPerson: Yup.string().required('Requerido'),
      email: Yup.string().required('Requerido'),
      address: Yup.string().required('Requerido'),
      city: Yup.string().required('Requerido'),
    })
  );

  const handleAddProvider = useCallback((values) => {
    axios
      .put('http://localhost/public/index.php/api/provider/add', values)
      .then((r) => onSubmit())
      .catch((err) => console.log(err))
      .finally(() => setInitialValues(undefined));
  }, []);

  const getLastCodProvider = useCallback(() => {
    if (providers) {
      setInitialValues({
        codProvider: providers[providers.length - 1].codProvider + 1,
        nameCompany: '',
        businessName: '',
        nif: '',
        contactPerson: '',
        email: '',
        phone: null,
        address: '',
        city: '',
      });
    }
  }, [providers]);

  useEffect(() => {
    getLastCodProvider();
  }, []);

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-secondary d-inline-flex align-items-center"
        onClick={() => getLastCodProvider()}
      >
        <AppRemixIcons icon="ri-user-add-line" />
        Nuevo Proveedor
      </button>

      {initialValues && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validationOnChange={false}
          validationOnBlur={false}
          onSubmit={handleAddProvider}
        >
          {({ setFieldValue, values, handleSubmit, errors }) => (
            <Form onSubmit={handleSubmit}>
              <AppModal
                target={initialValues}
                onClose={() => setInitialValues(undefined)}
                title="Nuevo Proveedor"
                isCloseButton
                closeButtonText="Cerrar"
                isSuccessButton
                successButtonText="Crear"
                onAccept={handleSubmit}
              >
                <div className="row mb-3">
                  <div className="col-6">
                    <AppNumber
                      title="Codigo Proveedor"
                      placeholder="Codigo de Proveedor"
                      value={values.codProvider}
                      onChange={(v) => setFieldValue('codProvider', v)}
                      error={errors.codProvider}
                      helperText={errors.codProvider}
                      isReadOnly={true}
                    />
                  </div>
                  <div className="col-6">
                    <AppInput
                      title="CIF"
                      placeholder="CIF"
                      value={values.nif}
                      onChange={(v) => setFieldValue('nif', v)}
                      error={errors.nif}
                      helperText={errors.nif}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-6">
                    <AppInput
                      title="Nombre Empresa"
                      placeholder="Nombre Empresa"
                      value={values.nameCompany}
                      onChange={(v) => setFieldValue('nameCompany', v)}
                      error={errors.nameCompany}
                      helperText={errors.nameCompany}
                    />
                  </div>
                  <div className="col-6">
                    <AppInput
                      title="Razon social"
                      placeholder="Razon social"
                      value={values.businessName}
                      onChange={(v) => setFieldValue('businessName', v)}
                      error={errors.businessName}
                      helperText={errors.businessName}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-6">
                    <AppInput
                      title="Persona de contacto"
                      placeholder="Persona de contacto"
                      value={values.contactPerson}
                      onChange={(v) => setFieldValue('contactPerson', v)}
                      error={errors.contactPerson}
                      helperText={errors.contactPerson}
                    />
                  </div>
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
                <div className="row mb-3">
                  <div className="col-6">
                    <AppNumber
                      title="Telefono"
                      placeholder="Telefono"
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
                      title="Dirección"
                      placeholder="Dirección"
                      value={values.address}
                      onChange={(v) => setFieldValue('address', v)}
                      error={errors.address}
                      helperText={errors.address}
                    />
                  </div>
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
                </div>
              </AppModal>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
}
