import React from 'react';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import { Admin, Resource } from 'react-admin';
import { PostList, PostEdit, PostCreate } from './components/Post/posts';
import { UserList } from './components/Users/users';
import { GuiasList, GuiasCreate } from './components/Guias/guias';
import { ProveedoresList } from './components/Proveedores/proveedores';

import jsonServerProvider from 'ra-data-json-server';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import GuidesIcon from '@material-ui/icons/Mood';

import fakeDataProvider from 'ra-data-fakerest';
import data from './data.json';

const dataProvider = fakeDataProvider(data);

//const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');


const App = () => (
  <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
    {/*   
    <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon}/>
    <Resource name="users" list={UserList} icon={UserIcon} />
    */}
      <Resource name="proveedores" list={ProveedoresList}/>
      <Resource name="guias" list={GuiasList} icon={UserIcon} create={GuiasCreate} />
  </Admin>
);

export default App;



