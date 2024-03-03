import AppCard from '../../Layout/Component/Form/AppCard';
import AppDatePicker from '../../Layout/Component/Form/AppDatePicker';
import AppInput from '../../Layout/Component/Form/AppInput';
import AppModal from '../../Layout/Component/Form/AppModal';
import AppNumber from '../../Layout/Component/Form/AppNumber';
import AppSelect from '../../Layout/Component/Form/AppSelect';
import AppRemixIcons from '../../Layout/Component/Icon/AppRemixIcons';

export default function ShitTest() {
  return (
    <>
      {/* > Botones */}
      <button className="btn btn-outline-secondary d-inline-flex align-items-center">
        <AppRemixIcons icon="ri-user-line" className="me-2" />
        Nueva Cosa
      </button>
      {/* < Botones */}
      {/* > Tabla */}
      <AppCard title="Listado de cosas" className="mt-3">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr className="table-warning">
              <th scope="row">3</th>
              <td>Larry the Bird</td>
              <td>@twitter</td>
              <td>@twitter</td>
            </tr>
            <tr className="table-success">
              <th scope="row">3</th>
              <td>Larry the Bird</td>
              <td>@twitter</td>
              <td>@twitter</td>
            </tr>
            <tr className="table-primary">
              <th scope="row">3</th>
              <td>Larry the Bird</td>
              <td>@twitter</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry the Bird</td>
              <td>@twitter</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </AppCard>
      {/* > Tabla */}
      {/* > Modal */}
      <button
        type="button"
        className="btn btn-outline-secondary d-inline-flex align-items-center mt-3"
        data-bs-toggle="modal"
        data-bs-target="#targetModalX"
      >
        <AppRemixIcons icon="ri-sun-line" className="me-2" />
        Boton de Modal
      </button>
      <AppModal
        target="targetModalX"
        title="Modal ventanita"
        isCloseButton
        isCloseButtonText="boton de cerrar"
        isSuccessButton
        isSuccessButtonText="boton de ok"
        onAccept={() => alert('pulsaste ok')}
        className="mt-5"
      >
        Aqui tu maravilloso contenido
      </AppModal>
      {/* < Modal */}
      {/* > Card */}
      <AppCard title="Hola" className="mt-3">
        adios
      </AppCard>
      {/* < Card */}
      fecha
      <div className="mt-3">
        <AppDatePicker title={'Fechas'} onChange={(v) => console.log(v)} />
      </div>
      Input de texto
      <div className="mt-3">
        <AppInput
          title={'Texto'}
          placeholder="placeholder"
          helperText="texto pequeñito que si quieres lo quitas"
          onChange={(v) => console.log(v)}
        />
      </div>
      Input de contraseñas
      <div className="mt-3">
        <AppInput
          title={'Para contraseñas'}
          placeholder="placeholder"
          type="password"
          helperText="texto pequeñito que si quieres lo quitas"
          onChange={(v) => console.log(v)}
        />
      </div>
      Input de solo numeros
      <div className="mt-3">
        <AppNumber
          title={'Numeritos'}
          placeholder="placeholder"
          helperText="texto pequeñito que si quieres lo quitas"
          onChange={(v) => console.log(v)}
        />
      </div>
      Selector
      <div className="mt-3">
        <AppSelect
          title={'Selecciona una tonteria'}
          options={[
            {label: 'camello portugues', value: 1},
            {label: 'Manco con picor de entrepierna', value: 2},
            {label: 'Tortilla con piña', value: 3},
            {label: 'Cantautora muda', value: 4},
          ]}
          placeholder="placeholder"
          helperText="texto pequeñito que si quieres lo quitas"
          onChange={(v) => console.log(v)}
        />
      </div>
    </>
  );
}
