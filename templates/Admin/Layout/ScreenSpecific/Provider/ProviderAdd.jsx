import { Field, Form, Formik } from 'formik';
import AppModal from '../../Component/Form/AppModal';
import AppRemixIcons from '../../Component/Icon/AppRemixIcons';
import AppNumber from '../../Component/Form/AppNumber';
import AppInput from '../../Component/Form/AppInput';

export default function ProviderAdd() {
  return (
    <>
      <button
        type="button"
        className="btn btn-outline-secondary d-inline-flex align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#targetModalX"
      >
        <AppRemixIcons icon="ri-sun-line" />
        Boton de Modal
      </button>

      <AppModal
        target="targetModalX"
        title="Nuevo Proveedor"
        content={
          <Formik
            initialValues={{
              idProvider: 0,
              nameCompany: '',
              businessName: '',
              nif: '',
              contactPerson: '',
              email: '',
              address: '',
              fechaAlta: 0,
            }}
            onSubmit={(v) => console.log(v)}
          >
            {({
              setFieldValue,
              handleSubmit,
              values,
              errors,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <AppNumber
                    title="Codigo Proveedor"
                    placeholder="Codigo de Proveedor"
                    values={values.idProvider}
                    onChange={(v) => setFieldValue('idProvider', v)}
                  />
                </div>
                <div className="input-group mb-3">
                  <AppInput
                    title="Nombre Empresa"
                    placeholder="Nombre Empresa"
                    values={values.nameCompany}
                    onChange={(v) => setFieldValue('nameCompany', v)}
                  />
                </div>
                <div className="input-group mb-3">
                  <AppInput
                    title="Razon social"
                    placeholder="Razon social"
                    values={values.businessName}
                    onChange={(v) => setFieldValue('businessName', v)}
                  />
                </div>
                <div className="input-group mb-3">
                  <AppInput
                    title="NIF"
                    placeholder="NIF"
                    values={values.nif}
                    onChange={(v) => setFieldValue('nif', v)}
                  />
                </div>
                <div className="input-group mb-3">
                  <AppInput
                    title="Persona de contacto"
                    placeholder="Persona de contacto"
                    values={values.contactPerson}
                    onChange={(v) => setFieldValue('contactPerson', v)}
                  />
                </div>
                <div className="input-group mb-3">
                  <AppInput
                    title="Email"
                    placeholder="Email"
                    values={values.email}
                    onChange={(v) => setFieldValue('email', v)}
                  />
                </div>
                <div className="input-group mb-3">
                  <AppInput
                    title="Dirección"
                    placeholder="Dirección"
                    values={values.address}
                    onChange={(v) => setFieldValue('address', v)}
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
              </form>
            )}
          </Formik>
        }
      />
    </>
  );
}
