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
import ProvQuickCreateButton from '../Proveedores/provQuickCreateButton';
import ProdQuickCreateButton from '../Productos/prodQuickCreateButton';

//import ProvReferenceInput from './../Proveedores/provReferenceInput'

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
             <Fragment> 
                {
                    items.map((item) => 
                        <div key={item.id}>
                            {`${item.id} - ${item.nombre}`}
                        </div>
                    )
                }
            </Fragment>
        </Fragment>
    );
};


export const GuiasList = props => (
    <List {...props} >
        <Datagrid rowClick="edit" expand={<ItemsProductos />}>
            <TextField source="id" />   
            <TextField source="nro_guia" label="Numero Guia" />
            <DateField source="date" />
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
                    <DateInput source="date" />
                    <ReferenceInput label="Proveedor" source="stock_owner_id" reference="res.partner">
                        <SelectInput optionText="name" />
                    </ReferenceInput>
                    <ProvQuickCreateButton
                        label="Proveedor"
                        source="stock_owner_id"
                        reference="res.partner" />
                    <ArrayInput source="guia_line_ids">
                        <SimpleFormIterator>
                            <ReferenceInput label="Producto" source="product_id" reference="product.product" >
                                <AutocompleteInput optionText="name"/>
                            </ReferenceInput>
                            <ProdQuickCreateButton
                                label="Producto"
                                source="id"
                                reference="productos" />
                            <TextInput source="precio" />
                            
                            <TextInput source="product_qty" />
                            <TextInput source="vacio_price" />

                        </SimpleFormIterator>
                    </ArrayInput> 

                    <MyDatagrid>
                        <TextField source="numero" />
                    </MyDatagrid>
                            
                </SimpleForm>                
            </Create>
        );
    }
}