import React, { Component } from 'react';
import createMessage from '../../util/message'
import axios from 'axios'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';


export class StockHistory extends Component {
  constructor() {
    super()
    this.state = {
      move_lines: []
    }
  }

  componentDidMount() {
    const message = createMessage("stock.quant", "get_move_lines", [this.props.record.id,[]]);
    console.log(message)
    axios.post('http://localhost:8080', message).then(response => {
      console.log(response.data.data[0])
      let mapped = response.data.data[0].map(item => {
        item.state = item.state == "done" ? "Realizado" : item.state == "assigned" ? "Reservado" : item.state
        item.type = item.from_loc == "Stock" ? "Salida" : "Entrada"
        

         
        return item
      })
      this.setState({ move_lines: mapped})
    })
    console.log(this.props.record)
  }

  render() {
    return (
      <div>
      <p>Movimientos</p>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell align="right">Usuario</TableCell>
              <TableCell align="right">Tipo</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">Cantidad Reservada</TableCell>
              <TableCell align="right">Cantidad Hecha</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.move_lines.map(line => (
              <TableRow key={line.id}>
                <TableCell component="th" scope="row">
                  {line.create_date}
                </TableCell>
                <TableCell align="right">{line.create_uid[1]}</TableCell>
                <TableCell align="right">{line.type}</TableCell>
                <TableCell align="right">{line.state}</TableCell>
                <TableCell align="right">{line.type == "Entrada" ? "+" : "-"}{line.ordered_qty}</TableCell>
                <TableCell align="right">{line.type == "Entrada" ? "+" : "-"}{line.qty_done}</TableCell>
              </TableRow>
            ))}
            
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">{this.state.move_lines.reduce((acc,line) => acc + (line.qty_done * (line.type == "Entrada" ? 1 : -1)),0)}</TableCell>
            </TableRow>
          </TableFooter>

        </Table>
      </div>
    )
  }
}