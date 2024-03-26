// import axios from 'axios';
// import { useCallback } from 'react';

import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import AppInput from './Admin/Layout/Component/Form/AppInput';
import { useState } from 'react';

 /**
  * @return [type]
  */
export default function AdminLoginScreen() {
  const [validationSchema] = useState(
    Yup.object().shape({
      email: Yup.string()
        .required('Introduzca un email')
        .email('El email no es valido'),
      password: Yup.string().required('Introduzca su contraseña'),
    })
  );

  // const handleTestUrl = useCallback(async () => {
  //   axios
  //     .get('http://localhost/public/index.php/api/test')
  //     .then((r) => console.log(r.data))
  //     .catch((err) => console.log(err));
  // });

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mt-5">Iniciar Sesión</h2>
            <div className="card my-3 shadow">
              <div className="card-body">
                <Formik
                  initialValues={{
                    email: null,
                    password: null,
                  }}
                  validationSchema={validationSchema}
                  validateOnChange={false}
                  validateOnBlur={false}
                  enableReinitialize
                  onSubmit={(v) => console.log(v)}
                >
                  {({ setFieldValue, values, handleSubmit, errors }) => (
                    <Form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <AppInput
                          title="Email"
                          error={errors.email}
                          helperText={errors.email}
                          onChange={(v) => setFieldValue('email', v)}
                        />
                      </div>
                      <div className="mb-3">
                        <AppInput
                          title="Contraseña"
                          type="password"
                          error={errors.password}
                          helperText={errors.password}
                          onChange={(v) => setFieldValue('password', v)}
                        />
                      </div>
                      <div className="d-flex justify-content-center ">
                        <button type="submit" className="btn btn-primary w-100">
                          Iniciar Sesión
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>{' '}
    </>
  );
}
