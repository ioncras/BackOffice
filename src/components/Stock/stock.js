import React from 'react';
import { List, Datagrid, TextField, ReferenceField, EditButton } from 'react-admin';
import { Edit, Create, SimpleForm, DisabledInput, ReferenceInput, SelectInput, TextInput, LongTextInput } from 'react-admin';
import { Filter, Responsive, SimpleList } from 'react-admin';


const StockFilter = (props) => (
  <Filter {...props}>
    <ReferenceInput label="Producto" source="product_id" reference="product.product" allowEmpty>
      <SelectInput source="display_name" />
    </ReferenceInput>
  </Filter>
);

export const StockList = props => (
  <List {...props} filters={<StockFilter />} filter={{ location_id: 12 }}>
    <Responsive



      small={
        <SimpleList
          primaryText={record => record.display_name}
          tertiaryText={record => record.quantity}
        />
      }
      medium={
        <Datagrid>
          <TextField source="id" />
          <TextField source="display_name" label="Producto" />
          <TextField source="reserved_quantity" label="Reservado"/>
          <TextField source="quantity" label="Cantidad"/>
        </Datagrid>
      }
    />
  </List>
);