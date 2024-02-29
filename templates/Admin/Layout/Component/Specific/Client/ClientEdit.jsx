/* eslint-disable react/prop-types */
import axios from 'axios';
import { Form, Formik } from 'formik';
import AppRemixIcons from '../../Icon/AppRemixIcons';
import AppInput from '../../Form/AppInput';
import AppNumber from '../../Form/AppNumber';
import { useCallback } from 'react';
import AppModal from '../../Form/AppModal';

export default function ClientEdit(props) {
  const { client, onSubmit } = props;

  const handleClientEdit = useCallback(
    (payload) => {
      axios
        .post('http://localhost/public/index.php/api/client/edit', {
          clientID: client.id,
          payload,
        })
        .then((r) => {
          console.log(r.data);
          onSubmit();
        })
        .catch((err) => console.log(err));
    },
    [client]
  );

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center"
        data-bs-toggle="modal"
        data-bs-target={`#editClient-${client.id}`}
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
              target={`editClient-${client.id}`}
              title={`Editar info de:  ${client.name} ${client.surname}`}
              isCloseButton
              isCloseButtonText="Cerrar"
              isSuccessButton
              isSuccessButtonText="Alta"
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
                        required="true"
                        error=""
                        onChange={(v) => setFieldValue('nif', v)}
                      ></AppInput>
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
                      ></AppInput>
                    </div>
                    <div className="col-7">
                      <AppInput
                        title="Apellidos"
                        placeholder="Apellidos"
                        value={values.surname}
                        required="true"
                        error=""
                        onChange={(v) => setFieldValue('surname', v)}
                      ></AppInput>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-5">
                      <AppNumber
                        title="Teléfono"
                        placeholder="Teléfono"
                        value={values.tlf}
                        required="true"
                        error=""
                        onChange={(v) => setFieldValue('tlf', v)}
                      ></AppNumber>
                    </div>
                    <div className="col-7">
                      <AppInput
                        title="Email"
                        placeholder="Email de contacto"
                        value={values.contactEmail}
                        required="true"
                        error=""
                        onChange={(v) => setFieldValue('contactEmail', v)}
                      ></AppInput>
                    </div>
                  </div>
                  <div className="mb-3">
                    <AppInput
                      title="Dirección"
                      placeholder="Dirección"
                      value={values.address}
                      required="true"
                      error=""
                      onChange={(v) => setFieldValue('address', v)}
                    ></AppInput>
                  </div>
                  <div className="row mb-3">
                    <div className="col-4">
                      <AppNumber
                        title="CP"
                        placeholder="Código postal"
                        value={values.cp}
                        required="true"
                        error=""
                        onChange={(v) => setFieldValue('cp', v)}
                      ></AppNumber>
                    </div>
                    <div className="col-8">
                      <AppInput
                        title="Ciudad"
                        placeholder="Ciudad"
                        value={values.city}
                        required="true"
                        error=""
                        onChange={(v) => setFieldValue('city', v)}
                      ></AppInput>
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
