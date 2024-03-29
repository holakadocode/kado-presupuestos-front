import { useState } from "react";
import { Box, Modal, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import AppRemixIcons from "../../Icon/AppRemixIcons";

 /**
  * @return [type]
  */
export default function FolderAdd() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  return (
    <>
      <div>
        <button
          className="btn btn-outline-secondary d-inline-flex align-items-center"
          onClick={handleOpen}
        >
          <AppRemixIcons icon="ri-folder-add-line" className="me-2" />
          Nueva Carpeta
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Nueva Carpeta
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Formik
                initialValues={{
                  nombreCarpeta: "",
                }}
                onSubmit={(values, { resetForm }) => {
                  handleClose();
                  resetForm();
                }}
              >
                <Form>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Nombre
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
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={handleClose}
                  >
                    Cerrar
                  </button>
                </Form>
              </Formik>
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
}
