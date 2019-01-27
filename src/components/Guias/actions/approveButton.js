import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlatButton from '@material-ui/core/Button';

import { showNotification } from 'react-admin';
import { push } from 'react-router-redux';
import createMessage from '../../../util/message'
import axios from 'axios';

class ApproveButton extends Component {
  handleClick = () => {
    const { id } = this.props.record
    const message = createMessage("ioncras.guia","button_validate",[id]);
    axios.post('http://sistemadeventas.com.ar:8080',message).then(response => {
      window.location.reload()
    })
  }

  render() {
    return <FlatButton label="Approve" variant="contained" color="primary" onClick={this.handleClick.bind(this)}>Validar</FlatButton>;
  }
}

ApproveButton.propTypes = {
  push: PropTypes.func,
  record: PropTypes.object,
  showNotification: PropTypes.func,
};

export default connect(null, {
  showNotification,
  push,
})(ApproveButton);