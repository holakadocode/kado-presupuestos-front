import { Form, Formik } from 'formik';
import AppModal from '../../Component/Form/AppModal';
import AppRemixIcons from '../../Component/Icon/AppRemixIcons';
import AppNumber from '../../Component/Form/AppNumber';
import AppInput from '../../Component/Form/AppInput';
import * as Yup from 'yup';
import { useCallback, useState } from 'react';
import axios from 'axios';
import AppDatePicker from '../../Component/Form/AppDatePicker';

export default function ProviderAdd(props) {
  const { onSubmit } = props;
  const [showModal, setShowModal] = useState(false);

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
        onClick={() => setShowModal(true)}
      >
        <AppRemixIcons icon="ri-user-add-line" />
        Nuevo Proveedor
      </button>

      <Formik
        initialValues={{
          idProvider: '1-0001',
          nameCompany: '',
          businessName: '',
          nif: '',
          contactPerson: '',
          email: '',
          address: '',
          dateStamp: null,
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
              target={showModal}
              onClose={() => setShowModal(false)}
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
                    value={values.idProvider}
                    onChange={(v) => setFieldValue('idProvider', v)}
                    isReadOnly
                  />
                </div>
                <div className="col-6">
                  <AppInput
                    title="NIF"
                    placeholder="NIF"
                    value={values.nif}
                    onChange={(v) => setFieldValue('nif', v)}
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
                  />
                </div>
                <div className="col-6">
                  <AppInput
                    title="Razon social"
                    placeholder="Razon social"
                    value={values.businessName}
                    onChange={(v) => setFieldValue('businessName', v)}
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
                  />
                </div>
                <div className="col-6">
                  <AppInput
                    title="Email"
                    placeholder="Email"
                    value={values.email}
                    onChange={(v) => setFieldValue('email', v)}
                  />
                </div>

                <div className="col-6 mt-3">
                  <AppDatePicker
                    title={'Fecha creación'}
                    onChange={(v) => setFieldValue('dateStamp', v)}
                    value={values.dateStamp}
                  />
                </div>
                <div className="col-12 mt-3">
                  <AppInput
                    title="Dirección"
                    placeholder="Dirección"
                    value={values.address}
                    onChange={(v) => setFieldValue('address', v)}
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
