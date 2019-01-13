import React, { Fragment  } from 'react';
import { ReferenceInput, SelectInput } from 'react-admin';
import ProvQuickCreateButton from './provQuickCreateButton';

const ProvReferenceInput = () => (
    <Fragment>
        <ReferenceInput {...this.props}>
            <SelectInput optionText="title" />
        </ReferenceInput>
        <ProvQuickCreateButton />
    </Fragment>
);