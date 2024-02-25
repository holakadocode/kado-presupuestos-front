import AppModal from '../../Layout/Component/Form/AppModal';
import AppRemixIcons from '../../Layout/Component/Icon/AppRemixIcons';

export default function ShitTest() {
  return (
    <>
      {/* > Botones */}
      <button className="btn btn-outline-secondary d-inline-flex align-items-center">
        <AppRemixIcons icon="ri-user-line" />
        Nueva Cosa
      </button>
      {/* < Botones */}

      {/* > Tabla */}
      <div className="mt-5">
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
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr className="table-success">
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr className="table-primary">
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* > Tabla */}

      {/* > Modal */}
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
        title="Modal ventanita"
        content="Aqui tu maravilloso contenido"
        isCloseButton
        isCloseButtonText="boton de cerrar"
        isSuccessButton
        isSuccessButtonText="boton de ok"
        onAccept={() => alert('pulsaste ok')}
      />
      {/* < Modal */}

      {/* > Card */}
      
      {/* < Card */}
    </>
  );
}
