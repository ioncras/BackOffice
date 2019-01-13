import React from 'react';
import { List, Filter,Datagrid, TextField,Create,SimpleForm,TextInput,Edit,DisabledInput } from 'react-admin';


const ProviderTitle = ({ record }) => {
    return <span>Proveedor {record ? `"${record.title}"` : ''}</span>;
};

const ProviderFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

export const ProviderList = props => (
    <List {...props} filters={<ProviderFilter />} >
        <Datagrid rowClick="edit">
            <TextField source="id" />   
            <TextField source="nombre" />
        </Datagrid>
    </List>
);


export const ProviderCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput label="Razon Social" source="nombre" type="text" />
        </SimpleForm>
    </Create>
);

export const ProviderEdit = props => (
    <Edit title={<ProviderTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="nombre" />
        </SimpleForm>
    </Edit>
);