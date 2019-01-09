import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';

export const ProveedoresList = props => (
    <List {...props} >
        <Datagrid rowClick="edit">
            <TextField source="id" />   
            <TextField source="nombre" />
        </Datagrid>
    </List>
);