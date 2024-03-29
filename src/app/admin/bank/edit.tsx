import * as React from 'react'
import { SimpleForm, Edit, TextInput, required, SelectInput, TextField, SelectField, NumberField } from 'react-admin'
import { Toolbar, SaveButton } from 'react-admin';
import {
  TabbedForm,
  Datagrid,
  DateField,
  ReferenceManyField,
  NumberInput,
  DateInput,
  BooleanInput,
  EditButton,
} from 'react-admin'

const bankStatusChoices = [
  { id: 'active', name: 'active' },
  { id: 'inactive', name: 'inactive' },
]

export const MyToolbar = () => (
  <Toolbar>
    <SaveButton label="Save" />
  </Toolbar>
);

const renderNumberField = (source: string | undefined) => <NumberField source={source} />

export const BanksEdit = () => {
  return (
    <Edit >
      <TabbedForm >
        <TabbedForm.Tab label="Bank Detail">
          <TextInput source="id" disabled />
          <TextInput source="user_id" disabled />
          <TextInput source="number1" />
          <TextInput source="number2" />
          <TextInput source="branch" />
          <SelectInput source="status" choices={bankStatusChoices} key={'status'} />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Password">
          <TextInput source="username" />
          <TextInput source="password" />
          <TextInput source="bankcode" />
          <TextInput source="linkqrcode" />
        </TabbedForm.Tab>
      </TabbedForm>
    </Edit>
  )
}
