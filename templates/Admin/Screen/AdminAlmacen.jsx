import { useState } from 'react'
//import { Route, Routes } from 'react-router-dom';
import { Field, Form, Formik } from "formik";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AdminAlmacen() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#new"
      >
        Crear Carpeta de artículo/servicio
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
              <h5 className="modal-title" id="nuevaCarpetaLabel">
                Nueva carpeta
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
                  nombreCarpeta: "",
                }}
              >
                <Form>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Nombre de la carpeta
                    </span>
                    <Field
                      type="text"
                      name="nombreCarpeta"
                      placeholder="Nombre de la carpeta"
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

      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>Carpeta 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Fecha</th>
                    <th scope="col">Familia</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Código</th>
                    <th scope="col">Código de distribuidor</th>
                    <th scope="col">Precio de distribuidor</th>
                    <th scope="col">Precio</th>
                    <th scope="col">ID de proveedor</th>
                    <th scope="col">Borrar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">22/11/24</th>
                    <td>Dildos</td>
                    <td>Satisfyer</td>
                    <td>Ya tu sabe</td>
                    <td>1</td>
                    <td>800</td>
                    <td>10€</td>
                    <td>30€</td>
                    <td>4552</td>
                    <td>
                      <DeleteIcon />
                    </td>
                  </tr>
                  <tr>
                    <IconButton
                      aria-label="add"
                      size="large"
                      onClick={handleOpen}
                    >
                      <LibraryAddIcon fontSize="inherit" />
                    </IconButton>
                    Añadir artículo/servicio
                  </tr>
                </tbody>
              </table>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Nuevo artículo/servicio
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Formik
                      initialValues={{
                        fecha: 0,
                        familia: "",
                        nombre: "",
                        descripción: "",
                        codigo: 0,
                        codigoDistribuidor: 0,
                        precioDistribuidor: 0,
                        precio: 0,
                        idProveedor: 0,
                      }}
                    >
                      <Form>
                        <div className="input-group mb-3">
                          <span className="input-group-text" id="basic-addon1">
                            Fecha
                          </span>
                          <Field
                            type="date"
                            name="fecha"
                            placeholder="Fecha"
                            className="form-control"
                          />
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-text" id="basic-addon1">
                            Familia
                          </span>
                          <Field
                            type="text"
                            name="familia"
                            placeholder="Familia"
                            className="form-control"
                          />
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-text" id="basic-addon1">
                            Nombre
                          </span>
                          <Field
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            className="form-control"
                          />
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-text" id="basic-addon1">
                            Descripción
                          </span>
                          <Field
                            type="text"
                            name="descripcion"
                            placeholder="Descripción"
                            className="form-select"
                          />
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-text" id="basic-addon1">
                            Código
                          </span>
                          <Field
                            type="number"
                            name="codigo"
                            placeholder="Código"
                            className="form-control"
                          />
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-text" id="basic-addon1">
                            Código del distribuidor
                          </span>
                          <Field
                            type="number"
                            name="codigoDistribuidor"
                            placeholder="Código del distribuidor"
                            className="form-control"
                          />
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-text" id="basic-addon1">
                            Precio del distribuidor
                          </span>
                          <Field
                            type="number"
                            name="precioDistribuidor"
                            placeholder="Precio del distribuidor"
                            className="form-control"
                          />
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-text" id="basic-addon1">
                            Precio
                          </span>
                          <Field
                            type="number"
                            name="precio"
                            placeholder="Precio"
                            className="form-control"
                          />
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-text" id="basic-addon1">
                            ID del proveedor
                          </span>
                          <Field
                            type="number"
                            name="idProveedor"
                            placeholder="ID del proveedor"
                            className="form-control"
                          />
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Crear
                        </button>
                      </Form>
                    </Formik>
                  </Typography>
                </Box>
              </Modal>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}
