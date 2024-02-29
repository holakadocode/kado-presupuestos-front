/* eslint-disable react/prop-types */
import axios from 'axios';
import { Form, Formik } from 'formik';
import AppRemixIcons from '../../Icon/AppRemixIcons';
import AppModal from '../../Form/AppModal';
import AppInput from '../../Form/AppInput';
import AppNumber from '../../Form/AppNumber';
import { useCallback } from 'react';

export default function ClientAdd(props) {
  const { onSubmit } = props;
  const handleAddClient = useCallback((values) => {
    axios
      .put('http://localhost/public/index.php/api/client/add', values)
      .then((r) => onSubmit())
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-secondary d-inline-flex align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#targetModaClientAdd"
      >
        <AppRemixIcons icon="ri-user-add-line" />
        Nuevo Cliente
      </button>

      <Formik
        initialValues={{
          name: '',
          surname: '',
          nif: '',
          tlf: '',
          contactEmail: '',
          address: '',
          cp: '',
          city: '',
          primaryKey: 'holaKase',
        }}
        // validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize
        onSubmit={handleAddClient}
        // onSubmit={() => {
        //   console.log();
        // }}
      >
        {({ setFieldValue, values, handleSubmit, errors }) => (
          <Form onSubmit={handleSubmit}>
            <AppModal
              target="targetModaClientAdd"
              title="Nuevo Cliente"
              isCloseButton
              isCloseButtonText="Cerrar"
              isSuccessButton
              isSuccessButtonText="Alta"
              onAccept={handleSubmit}
            >
              <div className="row mb-3">
                <div className="col-5">
                  <AppInput
                    title="NIF"
                    placeholder="NIF"
                    value={values.nif}
                    required="true"
                    // error=""
                    onChange={(v) => setFieldValue('nif', v)}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-5">
                  <AppInput
                    title="Nombre"
                    placeholder="Nombre"
                    value={values.name}
                    required="true"
                    error=""
                    onChange={(v) => setFieldValue('name', v)}
                  />
                </div>
                <div className="col-7">
                  <AppInput
                    title="Apellidos"
                    placeholder="Apellidos"
                    // value=""
                    required="true"
                    error=""
                    onChange={(v) => setFieldValue('surname', v)}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-5">
                  <AppNumber
                    title="Teléfono"
                    placeholder="Teléfono"
                    // value=""
                    required="true"
                    error=""
                    onChange={(v) => setFieldValue('tlf', v)}
                  />
                </div>
                <div className="col-7">
                  <AppInput
                    title="Email"
                    placeholder="Email de contacto"
                    // value=""
                    required="true"
                    error=""
                    onChange={(v) => setFieldValue('contactEmail', v)}
                  />
                </div>
              </div>
              <div className="mb-3">
                <AppInput
                  title="Dirección"
                  placeholder="Dirección"
                  // value=""
                  required="true"
                  error=""
                  onChange={(v) => setFieldValue('address', v)}
                />
              </div>
              <div className="row mb-3">
                <div className="col-4">
                  <AppNumber
                    title="CP"
                    placeholder="Código postal"
                    // value=""
                    required="true"
                    error=""
                    onChange={(v) => setFieldValue('cp', v)}
                  />
                </div>
                <div className="col-8">
                  <AppInput
                    title="Ciudad"
                    placeholder="Ciudad"
                    // value=""
                    required="true"
                    error=""
                    onChange={(v) => setFieldValue('city', v)}
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
