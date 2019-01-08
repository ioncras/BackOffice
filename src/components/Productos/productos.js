import React from 'react';
import { List, Datagrid, TextField, EmailField, Create, SimpleForm, ReferenceInput, SelectInput, TextInput, LongTextInput, DateField, DateInput } from 'react-admin';

export const ProductosList = props => (
    <List {...props} >
        <Datagrid rowClick="edit">
            <TextField source="id" />   
            <TextField source="nombre" />
        </Datagrid>
    </List>
);