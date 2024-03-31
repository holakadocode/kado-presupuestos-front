import { useCallback, useState } from "react";
import { Box, Modal, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import AppRemixIcons from "../../Icon/AppRemixIcons";
import axios from "axios";
import ProjectDefaultRoute from "../../../../../../src/Routing/ProjectDefaultRoute";

export default function ArticleEdit(props) {
  const {folderID, article, onSubmit} = props;
    
  const [open, setOpen] = useState(false);
  

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

  const handleEditArticle = useCallback((payload) => {
    axios
      .post(`${ProjectDefaultRoute}/api/storage/edit`, {
        ArticleID: article.id,
        payload
      })
      .then((r) => {
        onSubmit();
      })
      .catch((err) => console.log(err))
  },
  [folderID]
);

  return (
    <>
      <div>
        <button
          className="btn btn-outline-primary align-items-center"
          onClick={() => setOpen(true)}
        >
          <AppRemixIcons      
            icon="ri-edit-line"
            className="me-2 btn btn-outline-primary btn-sm" />
        </button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Nuevo Artículo
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Formik
                initialValues={{
                  name: article.name,
                  description: article.description,
                  code: article.code,
                  distributorCode: article.distributorCode,
                  distributorPrice: article.distributorPrice,
                  articlePrice: article.articlePrice,
                }}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(v) => handleEditArticle(v)}
              >
                {({ setFieldValue, values, handleSubmit, errors }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        Nombre
                      </span>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Nombre del artículo"
                        className="form-control"
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        Descripción
                      </span>
                      <Field
                        type="text"
                        name="description"
                        placeholder="Descripción del artículo"
                        className="form-control"
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        Código
                      </span>
                      <Field
                        type="text"
                        name="code"
                        placeholder="Código del artículo"
                        className="form-control"
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        Código del distribuidor
                      </span>
                      <Field
                        type="text"
                        name="distributorCode"
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
                        step="any"
                        name="distributorPrice"
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
                        step="any"
                        name="articlePrice"
                        placeholder="Precio del artículo"
                        className="form-control"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary ms-2"
                      onClick={()=>setOpen(false)}
                    >
                      Cerrar
                    </button>
                  </Form>
                )}
              </Formik>
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
}