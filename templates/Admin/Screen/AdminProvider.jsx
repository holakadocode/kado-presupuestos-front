//import { Route, Routes } from 'react-router-dom';
import { Field, Form, Formik } from "formik";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';


export default function AdminProvider() {

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#new"
      >
        Crear Nuevo Proveedor
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
              <h5 className="modal-title" id="crearProviderLabel">
                Nueva proveedor
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
                  idProveedor:0,
                  nombreEmpresa:'',
                  razonSocial:'',
                  nif:'',
                  contacto:'',
                  email:'',
                  direccion:'',
                  fechaAlta:0,
                  
                }}
              >
                <Form>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      CodigoProveedor
                    </span>
                    <Field
                      type="number"
                      name="idProveedor"
                      placeholder="Codigo de Proveedor"
                      className="form-control"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Nombre Empresa
                    </span>
                    <Field
                      type="text"
                      name="nombreEmpresa"
                      placeholder="Nombre de Empresa"
                      className="form-control"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Razón Social
                    </span>
                    <Field
                      type="text"
                      name="razonSocial"
                      placeholder="Razon Social"
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
                      className="form-select"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Persona Contacto
                    </span>
                    <Field
                      type="text"
                      name="contacto"
                      placeholder="Contacto"
                      className="form-control"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Correo Electrónico
                    </span>
                    <Field
                      type="email"
                      name="email"
                      placeholder="email"
                      className="form-control"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Dirección
                    </span>
                    <Field
                      type="text"
                      name="direccion"
                      placeholder="direccion"
                      className="form-control"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Fecha de Alta
                    </span>
                    <Field
                      type="date"
                      name="fechaAlta"
                      placeholder="Fecha de Alta"
                      className="form-control"
                    />
                  </div>
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