import React from 'react';
import { List, Datagrid, TextField, ReferenceField, EditButton } from 'react-admin';
import { Edit, Create, SimpleForm, DisabledInput, ReferenceInput, SelectInput, TextInput, LongTextInput } from 'react-admin';
import { Filter, Responsive, SimpleList } from 'react-admin';


const StockFilter = (props) => (
  <Filter {...props}>
    <ReferenceInput label="Producto" source="product_id" reference="product.product" allowEmpty>
      <SelectInput source="display_name" />
    </ReferenceInput>
    <ReferenceInput label="Locacion" source="location_id" reference="stock.location" allowEmpty>
      <SelectInput source="display_name" />
    </ReferenceInput>
    <ReferenceInput label="Proveedor" source="owner_id" reference="res.partner" allowEmpty>
      <SelectInput source="display_name" />
    </ReferenceInput>
  </Filter>
);

export const StockList = props => (
  <List {...props} filters={<StockFilter />}>
    <Responsive
      small={
        <SimpleList
          primaryText={record => record.name}
          tertiaryText={record => new Date(record.date).toLocaleDateString()}
        />
      }
      medium={
        <Datagrid>
          <TextField source="id" />
          <TextField source="display_name" />
          <TextField source="quantity" />
          <TextField source="owner_id" />
        </Datagrid>
      }
    />
  </List>
);