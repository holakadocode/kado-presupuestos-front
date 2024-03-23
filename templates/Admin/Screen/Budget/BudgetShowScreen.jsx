import axios from 'axios';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

export default function BudgetShowScreen() {
  const { clientID, budgetID } = useParams();
  const [budget, setBudget] = useState();

  const getData = useCallback(() => {
    axios
      .post('http://localhost/public/index.php/api/budget/get', {
        clientID,
        budgetID,
      })
      .then((r) => {
        console.log(r.data);
        setBudget(r.data);
      })
      .catch((err) => console.log(err));
  }, [budgetID]);

  useState(() => {
    getData();
  });

  return (
    <>
      {budget && (
        <>
          <h2>{budget?.ownCompany.name}</h2>
          <div className="ms-3">
            <div>CIF: {budget?.ownCompany?.taxIdentification}</div>
            <div>
              {budget?.ownCompany?.address}, cp: {budget?.ownCompany?.cp},{' '}
              {budget?.ownCompany?.city}
            </div>
            <div>
              {budget?.ownCompany?.phone}, {budget?.ownCompany?.email}
            </div>
          </div>

          <div className="row  mt-3">
            <div className="col-6">
              <h4>Cliente</h4>
              <div className="ms-3" style={{ height: '100px' }}>
                <b>
                  {budget?.client?.name} {budget?.client?.surname}
                </b>
                <div>{budget?.client?.taxIdentification}</div>
                <div>
                  {budget?.client?.address?.name}, {budget?.client?.address?.cp}
                  ,{budget?.client?.address?.city}
                </div>
                <div>
                  {budget?.client?.phone} - {budget?.client?.email}
                </div>
              </div>
            </div>

            <div className="col-6">
              <div>
                <h3>Presupuesto</h3>
                <h5 className="text-primary">P-000{budget?.id}</h5>
                <div>{budget?.dateStamp}</div>
              </div>
            </div>
          </div>

          <div className="mt-3 mb-5">
            <h5>Nombre de presupuesto:</h5>
            {budget?.title}
          </div>

          <TableHeader>
            <div>Codigo</div>
            <div>Articulo</div>
            <div>Cantidad</div>
            <div>Precio</div>
            <div>Total</div>
          </TableHeader>

          {budget?.articles?.map((article, i) => (
            <TableArticle key={i}>
              <div>{budget?.articles[i].code}</div>
              <div>{budget?.articles[i].article}</div>
              <div>{budget?.articles[i].quantity}</div>
              <div>{budget?.articles[i].price}</div>
              <div>
                {parseFloat(article.quantity) * parseFloat(article.price)}
              </div>
            </TableArticle>
          ))}

          <ResultTableHead>
            <div></div>
            <div></div>
            <div>IVA %</div>
            <div>IVA TOTAL</div>
            <div>SUBTOTAL</div>
            <div>TOTAL</div>
          </ResultTableHead>
          <ResultTable>
            <div></div>
            <div></div>
            <div>21%</div>
            <div>
              {(
                budget?.articles?.reduce(
                  (sum, article) => sum + article.quantity * article.price,
                  0
                ) * 0.21
              ).toFixed(2)}
            </div>
            <div>
              {budget?.articles
                ?.reduce(
                  (sum, article) => sum + article.quantity * article.price,
                  0
                )
                .toFixed(2)}
            </div>
            <div>
              {(
                budget?.articles?.reduce(
                  (sum, article) =>
                    sum +
                    parseFloat(article.quantity) * parseFloat(article.price),
                  0
                ) * 1.21
              ).toFixed(2)}
            </div>
          </ResultTable>
        </>
      )}
    </>
  );
}

const TableHeader = styled.div`
  border: 1px solid;
  border-color: #b6b4b4;
  background-color: #373837;
  color: white;
  /* height: 160px; */

  padding: 3px;
  display: grid;
  grid-template-columns: 0.1fr 0.6fr 0.1fr 0.1fr 0.1fr;

  & > div {
    text-align: center;
    &:nth-child(1) {
      text-align: left;
    }
    &:nth-child(2) {
      text-align: left;
    }
  }
`;
const TableArticle = styled.div`
  border: 1px solid;
  border-color: #b6b4b4;
  display: flex;
  align-items: center;
  /* height: 160px; */
  padding: 3px;
  display: grid;
  grid-template-columns: 0.1fr 0.6fr 0.1fr 0.1fr 0.1fr;

  & > div {
    text-align: center;
    &:nth-child(1) {
      text-align: left;
    }
    &:nth-child(2) {
      text-align: left;
    }
    &:nth-child(6) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const ResultTableHead = styled.div`
  border: 1px solid;
  background-color: #373837;
  color: white;
  display: flex;
  align-items: end;
  /* height: 160px; */
  padding: 3px;
  display: grid;
  grid-template-columns: 0.1fr 0.6fr 0.1fr 0.1fr 0.1fr 120px;

  & > div {
    &:nth-child(3) {
      text-align: center;
    }
    &:nth-child(4) {
      text-align: center;
    }
    &:nth-child(5) {
      text-align: center;
    }
    &:nth-child(6) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
const ResultTable = styled.div`
  border: 1px solid;
  display: flex;
  align-items: end;
  /* height: 160px; */
  padding: 3px;
  display: grid;
  grid-template-columns: 0.1fr 0.6fr 0.1fr 0.1fr 0.1fr 120px;
  & > div {
    &:nth-child(3) {
      text-align: center;
    }
    &:nth-child(4) {
      text-align: center;
    }
    &:nth-child(5) {
      text-align: center;
    }
    &:nth-child(6) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
