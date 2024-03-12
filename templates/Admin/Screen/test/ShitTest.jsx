import { useState } from 'react';
import AppCard from '../../Layout/Component/Form/AppCard';
import AppDatePicker from '../../Layout/Component/Form/AppDatePicker';
import AppInput from '../../Layout/Component/Form/AppInput';
import AppModal from '../../Layout/Component/Form/AppModal';
import AppNumber from '../../Layout/Component/Form/AppNumber';
import AppSelect from '../../Layout/Component/Form/AppSelect';
import AppRemixIcons from '../../Layout/Component/Icon/AppRemixIcons';

export default function ShitTest() {
  const [openShitModal, setShitModal] = useState(false);
  
  return (
    <div className="mb-5">
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
              <th>#</th>
              <th>First</th>
              <th>Last</th>
              <th>Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th>2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr className="table-warning">
              <th>3</th>
              <td>Larry the Bird</td>
              <td>@twitter</td>
              <td>@twitter</td>
            </tr>
            <tr className="table-success">
              <th>3</th>
              <td>Larry the Bird</td>
              <td>@twitter</td>
              <td>@twitter</td>
            </tr>
            <tr className="table-primary">
              <th>3</th>
              <td>Larry the Bird</td>
              <td>@twitter</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th>3</th>
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
        onClick={() => setOpenShitModal(true)}
      >
        <AppRemixIcons icon="ri-sun-line" className="me-2" />
        Boton de Modal
      </button>
      <AppModal
        target={openShitModal}
        onClose={() => setOpenShitModal(false)}
        title="Modal ventanita"
        isCloseButton
        closeButtonText="boton de cerrar"
        isSuccessButton
        successButtonText="boton de ok"
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
      <AppCard title="Fecha" className="mt-3">
        <div className="mt-3">
          <AppDatePicker title={'Fechas'} onChange={(v) => console.log(v)} />
        </div>
      </AppCard>
      <AppCard title="Input de texto" className="mt-3">
        <div className="mt-3">
          <AppInput
            title={'Texto'}
            placeholder="placeholder"
            helperText="texto pequeñito que si quieres lo quitas"
            onChange={(v) => console.log(v)}
          />
        </div>
      </AppCard>
      <AppCard title="Input de contraseñas" className="mt-3">
        <div className="mt-3">
          <AppInput
            title={'Para contraseñas'}
            placeholder="placeholder"
            type="password"
            helperText="texto pequeñito que si quieres lo quitas"
            onChange={(v) => console.log(v)}
          />
        </div>
      </AppCard>
      <AppCard title="Input de solo numeros" className="mt-3">
        <div className="mt-3">
          <AppNumber
            title={'Numeritos'}
            placeholder="placeholder"
            helperText="texto pequeñito que si quieres lo quitas"
            onChange={(v) => console.log(v)}
          />
        </div>
      </AppCard>
      <AppCard title="Selector" className="mt-3">
        <div className="mt-3">
          <AppSelect
            title={'Selecciona una tonteria'}
            options={[
              { label: 'camello portugues', value: 1 },
              { label: 'Manco con picor de entrepierna', value: 2 },
              { label: 'Tortilla con piña', value: 3 },
              { label: 'Cantautora muda', value: 4 },
            ]}
            placeholder="placeholder"
            helperText="texto pequeñito que si quieres lo quitas"
            onChange={(v) => console.log(v)}
          />
        </div>
      </AppCard>
    </div>
  );
}
