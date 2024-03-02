import {Form, Formik } from 'formik';
import AppModal from '../../Component/Form/AppModal';
import AppRemixIcons from '../../Component/Icon/AppRemixIcons';
import AppNumber from '../../Component/Form/AppNumber';
import AppInput from '../../Component/Form/AppInput';
import * as Yup from 'yup';
import { useCallback } from 'react';
import axios from 'axios';

export default function ProviderAdd(props) {
  const { onSubmit } = props;
  const handleAddProvider = useCallback((values) => {
    axios
      .put('http://localhost/public/index.php/api/provider/add', values)
      .then((r) => onSubmit())
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-secondary d-inline-flex align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#targetModalProviderAdd"
      >
        <AppRemixIcons icon="ri-user-add-line" />
        Nuevo Proveedor
      </button>

      <Formik
        initialValues={{
          idProvider: 0,
          nameCompany: '',
          businessName: '',
          nif: '',
          contactPerson: '',
          email: '',
          address: '',
          fechaAlta: 0,
        }}
        // validationSchema={validationSchema}
        validationOnChange={false}
        validationOnBlur={false}
        enableReinitialize
        onSubmit={handleAddProvider}
        // validationSchema={Yup.object({
        //   nameCompany:Yup.string().required('Campo obligatorio'),
        //   businessName:Yup.string().required('Campo obligatorio'),
        //   nif:Yup.string().required('Campo obligatorio'),
        //   contactPerson:Yup.string(),
        //   email:Yup.string().required('Campo obligatorio'),
        //   address:Yup.string().required('Campo obligatorio'),
        //   fechaAlta:Yup.date().nullable(),
      >
        {({ setFieldValue, values, handleSubmit, errors }) => (
          <Form onSubmit={handleSubmit}>
            <AppModal
              target="targetModalProviderAdd"
              title="Nuevo Proveedor"
              isCloseButton
              isCloseButtonText="Cerrar"
              isSuccessButton
              isSuccessButtonText="Alta"
              onAccept={handleSubmit}
            >
              <div className="row mb-3">
                <div className="col-5">
                  <AppNumber
                    title="Codigo Proveedor"
                    placeholder="Codigo de Proveedor"
                    values={values.idProvider}
                    onChange={(v) => setFieldValue('idProvider', v)}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-5">
                  <AppInput
                    title="Nombre Empresa"
                    placeholder="Nombre Empresa"
                    values={values.nameCompany}
                    onChange={(v) => setFieldValue('nameCompany', v)}
                  />
                </div>
              </div>
              <div className="col-7">
                <AppInput
                  title="Razon social"
                  placeholder="Razon social"
                  values={values.businessName}
                  onChange={(v) => setFieldValue('businessName', v)}
                />
              </div>
              <div className="row mb-3">
                <div className="col-5">
                  <AppInput
                    title="NIF"
                    placeholder="NIF"
                    values={values.nif}
                    onChange={(v) => setFieldValue('nif', v)}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <AppInput
                  title="Persona de contacto"
                  placeholder="Persona de contacto"
                  values={values.contactPerson}
                  onChange={(v) => setFieldValue('contactPerson', v)}
                />
              </div>
              <div className="row mb-3">
                <AppInput
                  title="Email"
                  placeholder="Email"
                  values={values.email}
                  onChange={(v) => setFieldValue('email', v)}
                />
              </div>
              <div className="row mb-3">
                <AppInput
                  title="Dirección"
                  placeholder="Dirección"
                  values={values.address}
                  onChange={(v) => setFieldValue('address', v)}
                />
              </div>
              <div className="row mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Fecha de Alta
                </span>
                <AppInput
                  type="date"
                  name="fechaAlta"
                  placeholder="Fecha de Alta"
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Crear
              </button>
            </AppModal>
          </Form>
        )}
      </Formik>
    </>
  );
}
