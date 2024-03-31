import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import AppInput from './Admin/Layout/Component/Form/AppInput';
import { useCallback, useState } from 'react';
import axios from 'axios';
import ProjectDefaultRoute from '../src/Routing/ProjectDefaultTemplate';
import { useNavigate } from 'react-router-dom';

export default function AdminLoginScreen(props) {
  const { onLogin } = props;
  const navigate = useNavigate();

  const [validationSchema] = useState(
    Yup.object().shape({
      username: Yup.string()
        .required('Introduzca un email')
        .email('El email no es valido'),
      password: Yup.string().required('Introduzca su contraseña'),
    })
  );

  const handleLogin = useCallback((payload) => {
    axios
      .post('http://localhost/public/index.php/api/login_check', {
        ...payload,
      })
      .then((r) => {
        onLogin(r.data.token);
        navigate(`/admin`);
      })
      .catch((err) => console.log(err));
  }, []);

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
                    username: 'a@b.es',
                    password: '1234',
                  }}
                  validationSchema={validationSchema}
                  validateOnChange={false}
                  validateOnBlur={false}
                  enableReinitialize
                  onSubmit={(v) => handleLogin(v)}
                >
                  {({ setFieldValue, values, handleSubmit, errors }) => (
                    <Form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <AppInput
                          title="Email"
                          value={values.username}
                          error={errors.username}
                          helperText={errors.username}
                          onChange={(v) => setFieldValue('email', v)}
                        />
                      </div>
                      <div className="mb-3">
                        <AppInput
                          title="Contraseña"
                          type="password"
                          value={values.password}
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
