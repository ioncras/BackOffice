import React from 'react';
import { List, Datagrid, TextField, FunctionField, Filter, ReferenceInput, DateInput, SelectInput, TextInput} from 'react-admin';


const VentaFilter = (props) => (
  <Filter {...props}>
    <ReferenceInput label="Cliente" source="partner_id" reference="res.partner" allowEmpty>
      <SelectInput source="display_name" />
    </ReferenceInput>
    <TextInput label="Id" source="id" />
    <DateInput label="Fecha" source="date" />
  </Filter>
);


export const VentaList = (props) => (
  <List {...props} filters={<VentaFilter />}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <FunctionField label="Cliente" render={record => `${record.partner_id[1]}`} />
      <FunctionField label="Total" render={record => `$${record.amount_total}`} />
    </Datagrid>
  </List>
);