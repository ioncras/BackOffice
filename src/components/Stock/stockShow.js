import React from 'react';
import { Show, SimpleShowLayout, TextField,FunctionField, DateField, EditButton, RichTextField } from 'react-admin';
import { StockHistory }  from './stockHistory'
export const StockShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="display_name" label="Producto" />
      <TextField source="quantity" label="Cantidad Fisica" />
      <TextField source="reserved_quantity" label="Reservado" />
      <FunctionField label="Cantidad Disponible" render={record => `${record.quantity - record.reserved_quantity}`} />
      <StockHistory record={props}/>
    </SimpleShowLayout>
  </Show>
);
