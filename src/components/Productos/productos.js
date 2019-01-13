import React from 'react';
import { List, 
    Datagrid, 
    TextField, 
    TextInput,
    Filter,
    SimpleForm,
    Create,
    Edit,
    DisabledInput,
    EditButton} from 'react-admin';


const ProductFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

const ProductTitle = ({ record }) => {
    return <span>Producto {record ? `"${record.title}"` : ''}</span>;
};


export const ProductList = props => (
    <List {...props} filters={<ProductFilter />}>
        <Datagrid rowClick="edit">
            <TextField source="id" />   
            <TextField source="nombre" />
            <EditButton label="Editar" />
        </Datagrid>
    </List>
);


export const ProductCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput label="Producto" source="nombre" type="text" />
        </SimpleForm>
    </Create>
);

export const ProductEdit = props => (
    <Edit title={<ProductTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="nombre" />
        </SimpleForm>
    </Edit>
);