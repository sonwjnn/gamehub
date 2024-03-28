import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'

import { SimpleForm, Edit, TextInput, required, SelectInput, TextField, SelectField, NumberField } from 'react-admin'
import { Toolbar, SaveButton } from 'react-admin'
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
)

const renderNumberField = (source: string | undefined) => <NumberField source={source} />

export const BanksEdit = () => {
  return (
    <Edit>
      <TabbedForm>
        <TabbedForm.Tab label="Bank Detail">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid xs={6}>
                <TextInput source="id" readOnly fullWidth />
                <TextInput source="user_id" readOnly fullWidth />
                <SelectInput source="status" choices={bankStatusChoices} key={'status'} fullWidth />
              </Grid>
              <Grid xs={6}>
                <TextInput source="number1" fullWidth />
                <TextInput source="number2" fullWidth />
                <TextInput source="branch" fullWidth />
              </Grid>
            </Grid>
          </Box>
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Password">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid xs={6}>
                <TextInput source="username" fullWidth />
                <TextInput source="password" fullWidth />
              </Grid>
              <Grid xs={6}>
                <TextInput source="bankcode" fullWidth />
                <TextInput source="linkqrcode" fullWidth />
              </Grid>
            </Grid>
          </Box>
        </TabbedForm.Tab>
      </TabbedForm>
    </Edit>
  )
}
