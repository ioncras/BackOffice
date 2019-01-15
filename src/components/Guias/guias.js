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
    const  items  = record.guia_line_ids;
    console.log(items)
    if (!items.length) {
        return <div>Sin Productos</div>;
    }
    const totalBultos = items.reduce((val, item)=> val += item.product_qty,0)
    return (
        <Fragment> 
             <Fragment> 
                {
                    items.map((item) => 
                        <div key={item.id}>
                            {`${item.product_id[1]} x ${item.product_qty}`}
                        </div>
                    )
                }
                <div>
                    Total bultos: {totalBultos}
                </div>
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

const guiaDefaultValue = { location_id: 8, picking_type_id: 4, date: new Date()};
const guiaLineDefaultValue = { product_uom_id: 1, vacio_price: 15, product_qty: 1}
export class GuiasCreate extends Component {
    render() {
        return (            
            <Create {...this.props}>
                <SimpleForm defaultValue={guiaDefaultValue}>
                    <TextInput source="numero" label="Numero Comprobante" />
                    <DateInput source="date" />
                    <ReferenceInput label="Proveedor" source="stock_owner_id" reference="res.partner">
                        <SelectInput optionText="name" />
                    </ReferenceInput>
                    <ProvQuickCreateButton
                        label="Proveedor"
                        source="stock_owner_id"
                        reference="res.partner" />
                    <ArrayInput source="guia_line_ids" label="Items">
                        <SimpleFormIterator defaultValue={guiaLineDefaultValue}>
                            <ReferenceInput label="Producto" source="product_id" reference="product.product" >
                                <AutocompleteInput optionText="name"/>
                            </ReferenceInput>
                            <ProdQuickCreateButton
                                label="Producto"
                                source="id"
                                reference="productos" />
                            <TextInput source="product_qty" label="Cantidad"/>
                            <TextInput source="vacio_price" label="Precio de Vacio"/>
                            <TextInput style={{display: "none"}} source="product_uom_id" defaultValue="1"/>

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