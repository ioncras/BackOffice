import React, { Fragment, Component } from 'react';
import {
    List,
    Datagrid,
    TextField,
    ArrayInput,
    AutocompleteInput,
    SimpleFormIterator,
    Create,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    TextInput,
    DateField,
    DateInput,
    DatagridBody,
    SimpleList
} from 'react-admin';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import ProvReferenceInput from './../Proveedores/provReferenceInput'

const GuiasTitle = ({ record }) => {
    return <span>Guias {record ? `"${record.title}"` : ''}</span>;
};

const ItemsProductos = ({record,resource}) => {
    const { items = [] } = record;

    if (!items.length) {
        return <div>Sin Productos</div>;
    }

    return (
        <Fragment>           

            {items.map((item) =>  <SimpleList key={item.id}
                primaryText={record => record.id}
                secondaryText={record => record.nombre}
            />)}
        </Fragment>
    );
};


export const GuiasList = props => (
    <List {...props} >
        <Datagrid rowClick="edit" expand={<ItemsProductos />}>
            <TextField source="id" />   
            <TextField source="numero" label="Numero Comprobante" />
            <DateField source="fecha" />
        </Datagrid>
    </List>
    
);


const MyDatagridRow = ({ record, resource, id, onToggleItem, children, selected, basePath }) => (
    <TableRow key={id}>
        {/* first column: selection checkbox */}
        <TableCell padding="none">
            {record.selectable && <Checkbox
                checked={selected}
                onClick={() => onToggleItem(id)}
            />}
        </TableCell>
        {/* data columns based on children */}
        {React.Children.map(children, field => (
            <TableCell key={`${id}-${field.props.source}`}>
                {React.cloneElement(field, {
                    record,
                    basePath,
                    resource,
                })}
            </TableCell>
        ))}
    </TableRow>
)

const MyDatagridBody = props => <DatagridBody {...props} row={<MyDatagridRow />} />;
const MyDatagrid = props => <Datagrid {...props} body={<MyDatagridBody />} />;

export class GuiasCreate extends Component {
    render() {
        return (            
            <Create {...this.props}>
                <SimpleForm>
                    <TextInput source="numero" label="Numero Comprobante" />
                    <DateInput source="fecha" />
                    <ReferenceInput label="Proveedor" source="proveedor_id" reference="proveedores">
                        <SelectInput optionText="nombre" />
                    </ReferenceInput>
                    <ArrayInput source="items">
                        <SimpleFormIterator>
                            <ReferenceInput label="Producto" reference="productos" >
                                <AutocompleteInput optionText="nombre"/>
                            </ReferenceInput>
                            <TextInput source="precio" />
                        </SimpleFormIterator>
                    </ArrayInput>
                    <MyDatagrid>
                        <TextField source="numero" />
                    </MyDatagrid>
                            
                </SimpleForm>
                <ProvReferenceInput></ProvReferenceInput>
            </Create>
        );
    }
}