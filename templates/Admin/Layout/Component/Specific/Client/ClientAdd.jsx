
import { Field, Form, Formik } from 'formik';


export default function ClientAdd() {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#new"
      >
        Crear Nuevo Cliente
      </button>
      <div
        className="modal fade"
        id="new"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="newItem"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="crearClientLabel">
                Nuevo Cliente
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Formik
                initialValues={{
                  id: 0,
                  name: '',
                  nif: '',
                  telf: '',
                  contactEmail: '',
                  adress: '',
                  cp: '',
                  city: '',
                  primaryKey: '',
                }}
              >
                <Form>
                  {/* <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Código Cliente
                    </span>
                    <Field
                      type="number"
                      name="primaryKey"
                      placeholder="Codigo del Cliente"
                      className="form-control"
                    />
                  </div> */}
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Nombre:
                    </span>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Nombre del Cliente"
                      className="form-control"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      NIF
                    </span>
                    <Field
                      type="text"
                      name="nif"
                      placeholder="NIF"
                      className="form-control"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Correo Electrónico:
                    </span>
                    <Field
                      type="email"
                      name="contactEemail"
                      placeholder="email"
                      className="form-control"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Dirección:
                    </span>
                    <Field
                      type="text"
                      name="adress"
                      placeholder="Dirección"
                      className="form-control"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Código Postal:
                    </span>
                    <Field
                      type="number"
                      name="cp"
                      placeholder="Código Postal"
                      className="form-control"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Ciudad:
                    </span>
                    <Field
                      type="text"
                      name="city"
                      placeholder="Ciudad"
                      className="form-control"
                    />
                  </div>
                  {/* <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Fecha de Alta
                    </span>
                    <Field
                      type="date"
                      name="fechaAlta"
                      placeholder="Fecha de Alta"
                      className="form-control"
                    />
                  </div> */}
                  <button type="submit" className="btn btn-primary">
                    Crear
                  </button>
                </Form>
              </Formik>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
