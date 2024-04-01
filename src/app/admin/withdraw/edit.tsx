import { SimpleForm, Edit, TextInput, required, SelectInput, TabbedForm } from 'react-admin'
import * as React from 'react'

export const WithdrawEdit = () => {
  return (
    <Edit>
      <TabbedForm >
        <TabbedForm.Tab label="Withdraw Detail">
          <TextInput
            source="cardName"
            validate={[required()]}
            label="cardName"
          />
          <TextInput
            source="cardCode"
            validate={[required()]}
            label="cardCode"
          />
          <TextInput
            source="amount"
            validate={[required()]}
            label="amount"
          />
          <SelectInput
            source="status"
            choices={[
              {
                id: 'active',
                name: 'active',
              },
              {
                id: 'inactive',
                name: 'inactive',
              },
            ]}
            validate={[required()]}
            label="status"
          />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Withdraw Comment">
          <TextInput source="id" label="Id" disabled />
          <TextInput source="userId" label="Id" disabled />
          <TextInput source="token" label="token" disabled />
          <TextInput
            source="comment"
            validate={[required()]}
            label="comment"
          />
        </TabbedForm.Tab>
      </TabbedForm>
    </Edit>
  )
}
