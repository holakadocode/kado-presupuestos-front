/* eslint-disable react/prop-types */
import axios from 'axios';
import { Form, Formik } from 'formik';
import AppRemixIcons from '../../Icon/AppRemixIcons';
import AppInput from '../../Form/AppInput';
import AppNumber from '../../Form/AppNumber';
import { useCallback, useState } from 'react';
import AppModal from '../../Form/AppModal';

export default function ClientEdit(props) {
  const { client, onSubmit } = props;
  const [showModal, setShowModal] = useState(false);

  const handleClientEdit = useCallback(
    (payload) => {
      axios
        .post('http://localhost/public/index.php/api/client/edit', {
          clientID: client.id,
          payload,
        })
        .then((r) => {
          onSubmit();
        })
        .catch((err) => console.log(err))
        .finally(() => setShowModal(false));
    },
    [client]
  );

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center"
        onClick={() => setShowModal(true)}
      >
        <AppRemixIcons icon="ri-pencil-line" />
      </button>

      <Formik
        initialValues={{
          name: client.name || '',
          surname: client.surname || '',
          nif: client.nif || '',
          tlf: client.tlf || '',
          contactEmail: client.contactEmail || '',
          address: client.address || '',
          cp: client.cp || '',
          city: client.city || '',
          primaryKey: 'nabo',
        }}
        // validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize
        onSubmit={handleClientEdit}
      >
        {({ setFieldValue, values, handleSubmit, errors }) => (
          <Form onSubmit={handleSubmit}>
            <AppModal
              target={showModal}
              onClose={() => setShowModal(false)}
              title={`Editar info de:  ${client.name} ${client.surname}`}
              isCloseButton
              closeButtonText="Cerrar"
              isSuccessButton
              successButtonText="Alta"
              onAccept={handleSubmit}
            >
              {client ? (
                <>
                  <div className="row mb-3">
                    <div className="col-5">
                      <AppInput
                        title="NIF"
                        placeholder="NIF"
                        value={values.nif}
                        required={true}
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
                </>
              ) : (
                <div> Cargando...</div>
              )}
            </AppModal>
          </Form>
        )}
      </Formik>
    </>
  );
}
