import React from 'react';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import { Admin, Resource } from 'react-admin';
import { PostList, PostEdit, PostCreate } from './components/Post/posts';
import { UserList } from './components/Users/users';
import { ProductList, ProductCreate,ProductEdit} from './components/Productos/productos';
import { ProveedorList, ProveedorCreate,ProveedorEdit} from './components/Proveedores/proveedores';
import { StockList } from './components/Stock/stock'
import {
  GuiasList,
  GuiasCreate,
  GuiaShow,
  GuiaEdit,
  VentaList,
  VentaShow,
  StockShow
} from './components/';

import jsonServerProvider from 'ra-data-json-server';
import VentasIcon from '@material-ui/icons/ShoppingBasket';
import UserIcon from '@material-ui/icons/Group';
import ProveedoresIcon from '@material-ui/icons/PermIdentity';
import StockIcon from '@material-ui/icons/GroupWork';
import GuiasIcon from '@material-ui/icons/Assignment';

import data from './data.json';
import dataProvider from './dataProvider'
//const dataProvider = fakeDataProvider(data);
import spanishMessages from './es'
const messages = {
  'es': spanishMessages,
};
const i18nProvider = locale => messages[locale];
//const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');


const App = () => (
  <Admin locale="es" i18nProvider={i18nProvider} dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
      <Resource name="res.users" list={UserList} icon={UserIcon} />
      <Resource name="product.product" list={ProductList}/>
      <Resource name="res.partner" list={ProveedorList} icon={ProveedoresIcon} />
      <Resource name="ioncras.guia" edit={GuiaEdit} list={GuiasList} create={GuiasCreate} icon={GuiasIcon}/>
      <Resource name="ioncras.guia.line" />
      <Resource name="stock.quant" show={StockShow} list={StockList} icon={StockIcon}/>
      <Resource name="sale.order" list={VentaList}  show={VentaShow} icon={VentasIcon} />
      <Resource name="sale.order.line" />
  </Admin>
);

export default App;



