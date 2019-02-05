import React from 'react';
import { Show, SimpleShowLayout,CardActions,TextField, Datagrid,ReferenceArrayField , FunctionField, DateField, EditButton, RichTextField } from 'react-admin';
import CancelOrderButton from './actions/cancelOrderButton'
const cardActionStyle = {
  zIndex: 2,

  display: 'inline-block',
  float: 'right',
};

const VentaActions = ({ basePath, data, resource }) => {
  if (!data) return null;
  const { state, id } = data;

  return (
    <CardActions style={cardActionStyle}>
     <CancelOrderButton record={data} />

    </CardActions>
  );
}



export const VentaShow = (props) => (
  <Show {...props} actions={<VentaActions />}>
    <SimpleShowLayout>
      <TextField source="display_name" label="Venta" />
      <TextField source="amount_total" label="Monto Total" />
      <ReferenceArrayField label="Items" reference="sale.order.line" source="order_line">
        <Datagrid>
          <FunctionField label="Producto" render={record => `${record.product_id[1]}`} />
          <TextField label="Cantidad" source="product_uom_qty" />
          <TextField label="Precio Unitario" source="price_unit" />
          <TextField label="Precio Total" source="price_total" />
        </Datagrid>
      </ReferenceArrayField>
    </SimpleShowLayout>
  </Show>
);
