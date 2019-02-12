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
    SimpleList,
    FunctionField,
    Filter,
    Show,
    SimpleShowLayout,
    ReferenceArrayField,
    SingleFieldList,
    ChipField,
    showNotification

} from 'react-admin';
import CardActions from '@material-ui/core/CardActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import TableHead from '@material-ui/core/TableHead';


import Button from '@material-ui/core/Button';
import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
    fetchUtils,
} from 'react-admin';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { change, submit, isSubmitting } from 'redux-form';
import dataProvider from '../../dataProvider'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import ProvQuickCreateButton from '../Proveedores/provQuickCreateButton';
import ProdQuickCreateButton from '../Productos/prodQuickCreateButton';



const GuiasTitle = ({ record }) => {
    return <span>Guias {record ? `"${record.title}"` : ''}</span>;
};

const GuiasFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="Proveedor" source="stock_owner_id" reference="res.partner" allowEmpty>
            <SelectInput source="display_name" />
        </ReferenceInput>
        <TextInput label="Id" source="id" />
        <DateInput label="Fecha" source="date" />
    </Filter>
);


class GuiaLines extends Component {
    constructor() {
        super()
        this.state = { guiaLines: [] }
    }

    componentDidMount() {
       /* dataProvider(GET_MANY, 'ioncras.guia.line', { ids: this.props.ids }).then(res => res.data)
            .then(result => this.setState({ guiaLines: result }))*/
        this.setState({guiaLines: this.props.ids })
    }

    render() {
        const { guiaLines } = this.state
        return guiaLines.length ? this.renderGuiaLines() : (
            <span>Cargando...</span>
        )
    }

    renderGuiaLines() {
        const items = this.state.guiaLines
        const totalBultos = items.reduce((val, item) => val += item.product_qty, 0)
        return (
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Producto</TableCell>
                        <TableCell align="right">Cantidad</TableCell>
                        <TableCell align="right">Precio Vacio</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.guiaLines.map(line => (
                        <TableRow key={line.id}>
                            <TableCell component="th" scope="row">
                                {line.product_id[1]}
                            </TableCell>
                            <TableCell align="right">{line.product_qty}</TableCell>
                            <TableCell align="right">{line.vacio_price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
        )
    }
}

const ItemsProductos = ({ record, resource }) => {
    const items = record.guia_line_ids;


    const totalBultos = items.reduce((val, item) => val += item.product_qty, 0)
    return (
        <GuiaLines ids={items} />
    );
};


export const GuiasList = props => (
    <List {...props} filters={<GuiasFilter />} sort={{ field: 'create_date', order: 'DESC' }}>
        <Datagrid rowClick="edit" expand={<ItemsProductos />}>
            <TextField source="id" />
            <TextField source="display_name" label="Guia" />
            <FunctionField label="Proveedor" render={record => `${record.stock_owner_id[1]} `} />
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

const guiaDefaultValue = { location_id: 8, picking_type_id: 4, date: new Date() };
const guiaLineDefaultValue = { product_uom_id: 1, vacio_price: 15, product_qty: 1 }
const redirect = (basePath, id, data) => `/ioncras.guia/${id}/show`;

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
                                <AutocompleteInput optionText="name" />
                            </ReferenceInput>
                            <ProdQuickCreateButton
                                label="Producto"
                                source="id"
                                reference="productos" />
                            <TextInput source="product_qty" label="Cantidad" />
                            <TextInput source="vacio_price" label="Precio de Vacio" />
                            <TextInput style={{ display: "none" }} source="product_uom_id" defaultValue="1" />

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

const editBtnOnClick = (e) => {
    console.log(push)
    push("/ioncras.guia/" + e.currentTarget.getAttribute('data-id'));
}


export const GuiaShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField label="Guia" source="display_name" />
            <FunctionField label="Estado" render={record => `${record.state === "done" ? "Validada" : "Sin validar"}`} />

            <ReferenceArrayField label="Items" reference="ioncras.guia.line" source="guia_line_ids">
                <Datagrid>
                    <FunctionField label="Producto" render={record => `${record.product_id[1]}`} />
                    <TextField label="Cantidad" source="product_qty" />
                    <FunctionField label="Precio Vacio" render={record => `$${record.vacio_price}`} />
                </Datagrid>
            </ReferenceArrayField>
        </SimpleShowLayout>
    </Show>
);
 
export { GuiaEdit } from './edit'