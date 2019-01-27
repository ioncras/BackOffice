import React from 'react';
import { Create, Edit, SimpleForm, DisabledInput,FunctionField, TextInput, DateInput, LongTextInput, ReferenceArrayField, Datagrid, TextField, DateField, EditButton } from 'react-admin';


export const GuiaEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput label="Id" source="id" />
      <ReferenceArrayField label="Items" reference="ioncras.guia.line" source="guia_line_ids">
        <Datagrid>
          <FunctionField label="Producto" render={record => `${record.product_id[1]}`} />
          <TextField label="Cantidad" source="product_qty" />
          <FunctionField label="Precio Vacio" render={record => `$${record.vacio_price}`} />
        </Datagrid>
      </ReferenceArrayField>
    </SimpleForm>
  </Edit>
)
