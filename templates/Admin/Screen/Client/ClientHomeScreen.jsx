import { IconButton } from '@mui/material';
import ClientAdd from '../../Layout/Component/Specific/Client/ClientAdd';
import { LibraryAddIcon } from '@mui/icons-material/LibraryAdd';
import { DeleteIcon } from '@mui/icons-material/Delete';

export default function ClientHomeScreen() {
  return (
    <>
      <ClientAdd />
      <div id="container">
        <table
          className="table table-striped"
          style={{ marginTop: '20px', width: '100%' }}
        >
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Edad</th>
              <th>Curso</th>
              <th>Fecha Matrícula</th>
              <th>Nota Media</th>
              <th>Progreso</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">22/11/24</th>
              <td>Dildos</td>
              <td>Satisfyer</td>
              <td>Ya tu sabe</td>
              <td>1</td>
              <td>800</td>
              <td>10€</td>
              <td>30€</td>
              <td>4552</td>
              <td>
                {/* <DeleteIcon /> */}
              </td>
            </tr>
            <tr>Añadir artículo/servicio</tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
