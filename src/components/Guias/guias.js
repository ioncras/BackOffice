import React from 'react';
import { List, Datagrid, TextField, EmailField } from 'react-admin';
import MyUrlField from './../../MyUrlField';

export const GuiasList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="" />
            <TextField source="" />
            <EmailField source="" />
            <TextField source="" />
            <MyUrlField source="" />
            <TextField source="" />
        </Datagrid>
    </List>
);
