import { SimpleForm, Edit, TextInput, required, SelectInput, TabbedForm } from 'react-admin'
import * as React from 'react'

export const RechargeEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TabbedForm >
          <TabbedForm.Tab label="Recharge Detail">
            <TextInput
              source="number1"
              validate={[required()]}
              label="number1"
            />
            <TextInput
              source="number2"
              validate={[required()]}
              label="number2"
            />
            <TextInput
              source="amount"
              validate={[required()]}
              label="amount"
            />
            <TextInput
              source="branch"
              validate={[required()]}
              label="branch"
            />
          </TabbedForm.Tab>
          <TabbedForm.Tab label="Detail">
            <TextInput source="id" label="Id" disabled />
            <TextInput source="userId" label="Id" disabled />
          </TabbedForm.Tab>
        </TabbedForm>
      </SimpleForm>
    </Edit>
  )
}
