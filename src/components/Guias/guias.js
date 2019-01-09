import React from 'react';
import { List, Datagrid, TextField, Create, SimpleForm, ReferenceInput, SelectInput, TextInput, DateField, DateInput } from 'react-admin';

const GuiasTitle = ({ record }) => {
    return <span>Guias {record ? `"${record.title}"` : ''}</span>;
};

export const GuiasList = props => (
    <List {...props} >
        <Datagrid rowClick="edit">
            <TextField source="id" />   
            <TextField source="numero" label="Numero Comprobante" />
            <DateField source="fecha" />
        </Datagrid>
    </List>
);


export const GuiasCreate = props => (
    <Create {...props}>
        <SimpleForm>            
            <TextInput source="numero" label="Numero Comprobante" />
            <DateInput source="fecha" />
            <ReferenceInput label="Proveedor" source="proveedor_id" reference="proveedores">
                <SelectInput optionText="nombre" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);