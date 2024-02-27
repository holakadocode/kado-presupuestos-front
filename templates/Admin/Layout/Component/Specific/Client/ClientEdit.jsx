import axios from 'axios';
import { Form, Formik } from 'formik';
import AppRemixIcons from '../../Icon/AppRemixIcons';
import AppModal from '../../Form/AppModal';
import AppInput from '../../Form/AppInput';
import AppNumber from '../../Form/AppNumber';
import { useCallback, useEffect, useState } from 'react';

export default function ClientEdit(props) {
  const { clientID, onSubmit } = props;
  const [clientToEdit, setClientToEdit] = useState();

  const loadClientEdit = useCallback(() => {
    axios
      .get(`http://localhost/public/index.php/api/client/get/${clientID}`)
      .then((r) => setClientToEdit(r.data))
      .catch((e) => console.log('ERROR', e));
  }, [clientID]);
    
  useEffect(() => {
      loadClientEdit();
    }, []);
    
    //   const handleSubmit = useCallback((values) => {
    //     axios
    //       .post('http://localhost/public/index.php/api/client/edit', values)
    //       .then((r) => console.log(r.data))
    //       .catch((err) => console.log(err));
    //   }, []);
  return (
    <>
      {/* <button
        type="button"
        className="btn btn-outline-secondary d-inline-flex align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#targetModalX"
      >
        <AppRemixIcons icon="ri-sun-line" />
        Editar Cliente
      </button>

      <AppModal
        target="targetModalX"
        title="Cliente Nuevo"
        isCloseButton
        isCloseButtonText="Cerrar"
        isSuccessButton
        isSuccessButtonText="Alta"
        // onAccept={handleSubmit}
        content={
         
        }
      /> */}

      {clientToEdit ? (
        <Formik
          initialValues={{
            name: clientToEdit.name,
            surname: clientToEdit.surname,
            nif: clientToEdit.nif,
            tlf: clientToEdit.tlf,
            contactEmail: clientToEdit.contactEmail,
            address: clientToEdit.address,
            cp: clientToEdit.cp,
            city: clientToEdit.city,
            // primaryKey: '',
          }}
          // validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          enableReinitialize
          // onSubmit={handleSubmit}
          // onSubmit={() => {
          //   console.log();
          // }}
        >
          {({ setFieldValue, values, handleSubmit, errors }) => (
            <Form onSubmit={handleSubmit}>
              <div className="col-5 mb-3">
                <AppInput
                  title="NIF"
                  placeholder="NIF"
                  value={values.nif}
                  required="true"
                  error=""
                  onChange={(v) => setFieldValue('nif', v)}
                ></AppInput>
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
              {/* <button
                  type="submit"
                  className="btn btn-outline-secondary d-inline-flex align-items-center"
                >
                  <AppRemixIcons icon="ri-sun-line" />
                  Alta
                </button> */}
            </Form>
          )}
        </Formik>
      ) : (
        <div> Cargando...</div>
      )}
    </>
  );
}
