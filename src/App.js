import React from 'react';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import { Admin, Resource } from 'react-admin';
import { PostList, PostEdit, PostCreate } from './components/Post/posts';
import { UserList } from './components/Users/users';
import { GuiasList } from './components/Guias/guias';
import jsonServerProvider from 'ra-data-json-server';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import GuidesIcon from '@material-ui/icons/Mood';


const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');


const App = () => (
  <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
      <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon}/>
      <Resource name="users" list={UserList}  icon={UserIcon}/>
      <Resource name="users" list={GuiasList}  icon={GuidesIcon}/>
  </Admin>
);

export default App;



