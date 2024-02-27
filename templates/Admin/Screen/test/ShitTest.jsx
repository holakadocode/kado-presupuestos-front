import ProjectDefaultRoute from '../../../../src/Routing/ProjectDefaultRoute';
import AppCard from '../../Layout/Component/Form/AppCard';
import AppDatePicker from '../../Layout/Component/Form/AppDatePicker';
import AppModal from '../../Layout/Component/Form/AppModal';
import AppRemixIcons from '../../Layout/Component/Icon/AppRemixIcons';

export default function ShitTest() {
  console.log('ProjectDefaultRoute', ProjectDefaultRoute());
  return (
    <>
      {/* > Botones */}
      <button className="btn btn-outline-secondary d-inline-flex align-items-center">
        <AppRemixIcons icon="ri-user-line" className="me-2" />
        Nueva Cosa
      </button>
      {/* < Botones */}

      
      {/* > Tabla */}
      <AppCard
        title="Listado de cosas"
        className="mt-3"
        content={
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
        }
      />
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
        content="Aqui tu maravilloso contenido"
        isCloseButton
        isCloseButtonText="boton de cerrar"
        isSuccessButton
        isSuccessButtonText="boton de ok"
        onAccept={() => alert('pulsaste ok')}
        className="mt-5"
      />
      {/* < Modal */}
      {/* > Card */}
      <AppCard title="Hola" content="adios" className="mt-3" />
      {/* < Card */}

      <div className="mt-3">
        <AppDatePicker title={'Fechas'} onChange={(v) => console.log(v)} />
      </div>
    </>
  );
}
