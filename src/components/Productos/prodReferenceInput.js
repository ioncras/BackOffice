import React, { Fragment  } from 'react';
import { ReferenceInput, AutocompleteInput } from 'react-admin';
import ProdQuickCreateButton from './prodQuickCreateButton';

const ProdReferenceInput = () => (
    <Fragment>
        <ReferenceInput {...this.props}>
            <AutocompleteInput optionText="nombre"/>
        </ReferenceInput>
        
        <ProdQuickCreateButton />
    </Fragment>
);