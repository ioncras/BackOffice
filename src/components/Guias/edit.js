import React, { Fragment, Component } from 'react';
import { Create, Edit, SimpleForm, DisabledInput,
  FunctionField, TextInput, DateInput, LongTextInput,
   ReferenceArrayInput, Datagrid, TextField, DateField, EditButton,
   ArrayInput, SimpleFormIterator, ReferenceInput, AutocompleteInput

  } from 'react-admin';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import ApproveButton from './actions/approveButton'

const cardActionStyle = {
  zIndex: 2,

  display: 'inline-block',
  float: 'right',
};

const GuiaActions = ({ basePath, data, resource }) => {
  if (!data) return null;
  const { state, id } = data;

  return (
    <CardActions style={cardActionStyle}>
      {state !== 'done' ? <ApproveButton record={data} /> : null}

    </CardActions>
  );
}

export class GuiaEdit extends Component {
    constructor() {
      super()
      this.state = { guiaLines: [] }
    }

    componentDidMount() {

    }

    render() {
      return (
        <Edit {...this.props} actions={<GuiaActions/>}>
          <SimpleForm>
            <DisabledInput label="Id" source="id" />
            <ArrayInput source="guia_line_ids" label="Items">
              <SimpleFormIterator>
                <ReferenceInput label="Producto" source="product_id[0]" reference="product.product" >
                  <AutocompleteInput optionText="name" />
                </ReferenceInput>

                <TextInput source="product_qty" label="Cantidad" />
                <TextInput source="vacio_price" label="Precio de Vacio" />
                <TextInput style={{ display: "none" }} source="product_uom_id" defaultValue="1" />

              </SimpleFormIterator>
            </ArrayInput>
          </SimpleForm>
        </Edit>
      )
    }
}