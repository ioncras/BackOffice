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
  VentaList
} from './components/';

import jsonServerProvider from 'ra-data-json-server';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import GuidesIcon from '@material-ui/icons/Mood';

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
      <Resource name="res.partner" list={ProveedorList}/>
      <Resource name="ioncras.guia" show={GuiaShow} list={GuiasList} create={GuiasCreate} />
      <Resource name="stock.quant" list={StockList} />
      <Resource name="sale.order" list={VentaList} />
      <Resource name="ioncras.guia.line" />
  </Admin>
);

export default App;



