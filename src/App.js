import React from 'react';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import { Admin, Resource } from 'react-admin';
import { PostList, PostEdit, PostCreate } from './components/Post/posts';
import { UserList } from './components/Users/users';
import { ProductList, ProductCreate,ProductEdit} from './components/Productos/productos';
import { ProveedorList, ProveedorCreate,ProveedorEdit} from './components/Proveedores/proveedores';
import {
  GuiasList,
  GuiasCreate
} from './components';

import jsonServerProvider from 'ra-data-json-server';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import GuidesIcon from '@material-ui/icons/Mood';

import fakeDataProvider from 'ra-data-fakerest';
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
      <Resource name="ioncras.guia" list={GuiasList} icon={UserIcon} create={GuiasCreate} />
  </Admin>
);

export default App;



