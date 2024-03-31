import { useCallback, useState } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import AppRemixIcons from '../../Icon/AppRemixIcons';
import axios from 'axios';
import ProjectDefaultRoute from '../../../../../../src/Routing/ProjectDefaultRoute';
import AppInput from '../../Form/AppInput';
import AppModal from '../../Form/AppModal';
import AppNumber from '../../Form/AppNumber';

export default function ArticleAdd(props) {
  const { folderID, onSubmit } = props;
  const [validationSchema] = useState(
    Yup.object().shape({
      name: Yup.string().required('Requerido'),
      code: Yup.string().required('Requerido'),
      price: Yup.number().required('Requerido'),
    })
  );

  const [open, setOpen] = useState(false);

  const handleAddArticle = useCallback(
    (values) => {
      axios
        .put(
          `${ProjectDefaultRoute}/api/storage/articleAdd`,
          { values, folderID },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        )
        .then((r) => onSubmit())
        .catch((err) => console.log(err));
    },
    [folderID]
  );

  return (
    <>
      <div>
        <span
          onClick={() => setOpen(true)}
          className="btn btn-outline-primary btn-sm"
        >
          <AppRemixIcons icon="ri-add-line" /> Añadir Articulo
        </span>

        <Formik
          initialValues={{
            name: '',
            description: '',
            code: '',
            distributorCode: '',
            distributorPrice: '',
            articlePrice: '',
            price: '',
          }}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(v) => handleAddArticle(v)}
        >
          {({ setFieldValue, values, handleSubmit, errors }) => (
            <Form>
              <AppModal
                target={open}
                onClose={() => setOpen(false)}
                title="Actualizar articulo"
                isCloseButton
                closeButtonText="Cerrar"
                isSuccessButton
                successButtonText="Actualizar"
                onAccept={handleSubmit}
              >
                <AppInput
                  title={'Nombre de articulo'}
                  value={values.name}
                  helperText={errors.name}
                  onChange={(v) => setFieldValue('name', v)}
                  error={errors.name}
                />

                <AppInput
                  title={'Descripción'}
                  value={values.description}
                  helperText={errors.description}
                  onChange={(v) => setFieldValue('description', v)}
                  error={errors.description}
                  className="mt-3"
                />

                <AppInput
                  title={'Código'}
                  value={values.code}
                  helperText={errors.code}
                  onChange={(v) => setFieldValue('code', v)}
                  error={errors.code}
                  className="mt-3"
                />
                <AppInput
                  title={'Código del distribuidor'}
                  value={values.distributorCode}
                  helperText={errors.distributorCode}
                  onChange={(v) => setFieldValue('distributorCode', v)}
                  error={errors.distributorCode}
                  className="mt-3"
                />

                <AppNumber
                  title={'Precio del distribuidor'}
                  value={values.distributorPrice}
                  helperText={errors.distributorPrice}
                  onChange={(v) => setFieldValue('distributorPrice', v)}
                  error={errors.distributorPrice}
                  className="mt-3"
                />

                <AppNumber
                  title={'Precio'}
                  value={values.price}
                  helperText={errors.price}
                  onChange={(v) => setFieldValue('price', v)}
                  error={errors.price}
                  className="mt-3"
                />
              </AppModal>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
