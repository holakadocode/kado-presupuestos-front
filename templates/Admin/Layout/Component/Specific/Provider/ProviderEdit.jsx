import axios from 'axios';
import { useCallback, useState } from 'react';
import * as Yup from 'yup';
import AppRemixIcons from '../../Icon/AppRemixIcons';
import { Form, Formik } from 'formik';
import AppModal from '../../Form/AppModal';
import AppNumber from '../../Form/AppNumber';
import AppInput from '../../Form/AppInput';
import ProjectDefaultRoute from '../../../../../../src/Routing/ProjectDefaultRoute';
import { useNavigate } from 'react-router-dom';

export default function ProviderEdit(props) {
  const { provider, onSubmit } = props;
  const navigate = useNavigate();
  const [showEditProvider, setShowEditProvider] = useState(false);
  const [validationSchema] = useState(
     Yup.object().shape({
      codProvider: Yup.string().required('Requerido'),
      phone: Yup.number().required('Requerido'),
      nameCompany: Yup.string().required('Requerido'),
      businessName: Yup.string().required('Requerido'),
      nif: Yup.string().required('Requerido'),
      contactPerson: Yup.string().required('Requerido'),
      email: Yup.string().required('Requerido'),
      address: Yup.string().required('Requerido'),
      city: Yup.string().required('Requerido'),
    })
  );
  const handleProviderEdit = useCallback(
    (payload) => {
      axios
        .post(
          `${ProjectDefaultRoute}/api/provider/edit`,
          { providerID: provider.id, payload },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        )
        .then(() => {
          onSubmit();
        })
        .finally(() => setShowEditProvider(false))
        .catch((errors) => {
          console.log(errors);
          if (errors.response?.status === 401) {
            localStorage.removeItem('authToken', null);
            navigate('/');
          }
        });
    },
    [provider]
  );

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center"
        onClick={() => setShowEditProvider(true)}
      >
        <AppRemixIcons icon="ri-pencil-line" />
      </button>

      <Formik
        initialValues={{
          codProvider: provider.codProvider || '',
          nameCompany: provider.nameCompany || '',
          businessName: provider.businessName || '',
          nif: provider.nif || '',
          contactPerson: provider.contactPerson || '',
          email: provider.email || '',
          phone: provider.phone || '',
          address: provider.address || '',
          city: provider.city || '',
        }}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        // enableReinitialize
        onSubmit={handleProviderEdit}
      >
        {({ setFieldValue, values, handleSubmit, errors }) => (
          <Form onSubmit={handleSubmit}>
            <AppModal
              target={showEditProvider}
              onClose={() => setShowEditProvider(false)}
              title={`Editar info de: ${provider.nameCompany}`}
              isCloseButton
              closeButtonText="Cerrar"
              isSuccessButton
              successButtonText="Editar"
              onAccept={handleSubmit}
            >
              {provider ? (
                <>
                  <div className="row mb-3">
                    <div className="col-6">
                      <AppNumber
                        title="Codigo Proveedor"
                        placeholder="Codigo de Proveedor"
                        value={values.codProvider}
                        onChange={(v) => setFieldValue('codProvider', v)}
                        error={errors.codProvider}
                        helperText={errors.codProvider}
                        isReadOnly={true}
                      />
                    </div>
                    <div className="col-6">
                      <AppInput
                        title="CIF"
                        placeholder="CIF"
                        value={values.nif}
                        onChange={(v) => setFieldValue('nif', v)}
                        error={errors.nif}
                        helperText={errors.nif}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <AppInput
                        title="Nombre Empresa"
                        placeholder="Nombre Empresa"
                        value={values.nameCompany}
                        onChange={(v) => setFieldValue('nameCompany', v)}
                        error={errors.nameCompany}
                        helperText={errors.nameCompany}
                      />
                    </div>
                    <div className="col-6">
                      <AppInput
                        title="Razon social"
                        placeholder="Razon social"
                        value={values.businessName}
                        onChange={(v) => setFieldValue('businessName', v)}
                        error={errors.businessName}
                        helperText={errors.businessName}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-6">
                      <AppInput
                        title="Persona de contacto"
                        placeholder="Persona de contacto"
                        value={values.contactPerson}
                        onChange={(v) => setFieldValue('contactPerson', v)}
                        error={errors.contactPerson}
                        helperText={errors.contactPerson}
                      />
                    </div>
                    <div className="col-6">
                      <AppInput
                        title="Email"
                        placeholder="Email"
                        value={values.email}
                        onChange={(v) => setFieldValue('email', v)}
                        error={errors.email}
                        helperText={errors.email}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <AppNumber
                        title="Telefono"
                        placeholder="Telefono"
                        value={values.phone}
                        onChange={(v) => setFieldValue('phone', v)}
                        error={errors.phone}
                        helperText={errors.phone}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <AppInput
                        title="Dirección"
                        placeholder="Dirección"
                        value={values.address}
                        onChange={(v) => setFieldValue('address', v)}
                        error={errors.address}
                        helperText={errors.address}
                      />
                    </div>
                    <div className="col-6">
                      <AppInput
                        title="Ciudad"
                        placeholder="Ciudad"
                        value={values.city}
                        onChange={(v) => setFieldValue('city', v)}

                      />
                    </div>
                  </div>
                </>
              ) : (
                <div>Cargando...</div>
              )}
            </AppModal>
          </Form>
        )}
      </Formik>
    </>
  );
}
