/* eslint-disable react/prop-types */
import axios from 'axios';
import { Form, Formik } from 'formik';
import AppRemixIcons from '../../Icon/AppRemixIcons';
import AppModal from '../../Form/AppModal';
import AppInput from '../../Form/AppInput';
import AppNumber from '../../Form/AppNumber';
import { useCallback, useState } from 'react';

export default function ClientAdd(props) {
  const { onSubmit } = props;
  const [showModal, setShowModal] = useState(false);

  const handleAddClient = useCallback((values) => {
    axios
      .put('http://localhost/public/index.php/api/client/add', values)
      .then((r) => onSubmit())
      .catch((err) => console.log(err))
      .finally(() => setShowModal(false));
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
        // validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        // enableReinitialize
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
                    // error=""
                    onChange={(v) => setFieldValue('name', v)}
                  />
                </div>
                <div className="col-7">
                  <AppInput
                    title="Apellidos"
                    placeholder="Apellidos"
                    value={values.surname}
                    required
                    // error=""
                    onChange={(v) => setFieldValue('surname', v)}
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
                    // error=""
                    onChange={(v) => setFieldValue('tlf', v)}
                  />
                </div>
                <div className="col-7">
                  <AppInput
                    title="Email"
                    placeholder="Email de contacto"
                    value={values.contactEmail}
                    required
                    // error=""
                    onChange={(v) => setFieldValue('contactEmail', v)}
                  />
                </div>
              </div>
              <div className="mb-3">
                <AppInput
                  title="Dirección"
                  placeholder="Dirección"
                  value={values.address}
                  required
                  // error=""
                  onChange={(v) => setFieldValue('address', v)}
                />
              </div>
              <div className="row mb-3">
                <div className="col-4">
                  <AppNumber
                    title="CP"
                    placeholder="Código postal"
                    value={values.cp}
                    required
                    // error=""
                    onChange={(v) => setFieldValue('cp', v)}
                  />
                </div>
                <div className="col-8">
                  <AppInput
                    title="Ciudad"
                    placeholder="Ciudad"
                    value={values.city}
                    required
                    // error=""
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
