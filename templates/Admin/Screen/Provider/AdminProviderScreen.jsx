//import { Route, Routes } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AppRemixIcons from '../../Layout/Component/Icon/AppRemixIcons';
import AppModal from '../../Layout/Component/Form/AppModal';
import axios from 'axios';
import { useCallback } from 'react';
import { useEffect } from 'react';
import ProviderAdd from '../../Layout/ScreenSpecific/Provider/ProviderAdd';

export default function AdminProviderScreen() {
  // const loadProviderList = useCallback(async () => {
  //   axios
  //     .get('http://localhost/public/index.php/api/provider/list/')
  //     .then((r) => console.log(r.data))
  //     .catch((err) => console.log(err));
  // });

  // useEffect(()=>{
  //   loadProviderList();

  // },[])

  return (
    <>
      <ProviderAdd />
      <div className="mt-3">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">codigo</th>
              <th scope="col">Nombre</th>
              <th scope="col">Nif</th>
              <th scope="col">Contacto</th>
              <th scope="col">Email</th>
              <th scope="col">Direccion</th>
              <th scope="col">FechaAlta</th>

            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Empresa</td>
              <td>b-39393939</td>
              <td>Godofredo</td>
              <td>godofredo@kk.es</td>
              <td>calle melancolia</td>
              <td>25/02/2024</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
