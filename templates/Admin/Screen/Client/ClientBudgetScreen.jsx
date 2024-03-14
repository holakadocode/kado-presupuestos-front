import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import AppRemixIcons from '../../Layout/Component/Icon/AppRemixIcons';
import AppModal from '../../Layout/Component/Form/AppModal';
import { useLocation, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import AppInput from '../../Layout/Component/Form/AppInput';
import AppNumber from '../../Layout/Component/Form/AppNumber';

export default function ClientBudgetScreen() {
 const { clientID } = useParams();
  const [client, setClient] = useState(null);
 const [clientBudgets, setClientBudgets] = useState([]);

  console.log('ClientID:', clientID);
  
  const getClientBudgets = useCallback(() => {
    axios
      .get('http://localhost/public/index.php/api/client/get', {
        data: { clientID: client.id },
      })
      .then((r) => setClientBudgets(r.data))
      .catch((e) => console.log('E', e));
  }, [client]);

  useEffect(() => {
    getClientBudgets();
  }, [getClientBudgets]);



  return (
    <>
      {/* <ClientAdd onSubmit={() => getClients()} /> */}
      bubub
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
        // onSubmit={handleClientEdit}
      >
        {({ setFieldValue, values, handleSubmit, errors }) => (
          <Form onSubmit={handleSubmit}>
            <AppModal
            //   target={showModal}
            //   onClose={() => setShowModal(false)}
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


      {/* > Tabla */}
      <div id="container">
        <div className="mt-5">
          {clientBudgets && clientBudgets.length ? (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>IVA</th>
                  <th>Total</th>

                  <th></th>
                </tr>
              </thead>
              <tbody>
                {clientBudgets?.map((budgets) => (
                  <tr key={budgets.id}>
                    <td>{budgets.id}</td>
                    <td>{budgets.title}</td>
                    <td>{budgets.iva}</td>
                    <td>{budgets.total}</td>

                    <td>
                      <button className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center">
                        <AppRemixIcons icon="ri-arrow-up-circle-line" />
                      </button>
                    </td>
                    <td>
                      {/* <ClientEdit
                        client={client}
                        onSubmit={() => {
                          getClients();
                        }}
                      /> */}
                    </td>
                    <td>
                      {/* <button
                        className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center"
                        onClick={() => deleteClient(client.id)}
                      >
                        <AppRemixIcons icon="ri-delete-bin-line" />
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>Este cliente no tiene presupuestos</div>
          )}
        </div>
      </div>
    </>
  );
}
