import { SimpleForm, Edit, TextInput, required, SelectInput } from 'react-admin'
import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box'
import * as React from 'react'

export const UserEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={6}>

              <TextInput source="name" validate={[required()]} label="Name" fullWidth />
              <TextInput source="email" validate={[required()]} label="Email" fullWidth />
              <SelectInput fullWidth
                           source="role"
                           choices={[
                             {
                               id: 'ADMIN',
                               name: 'ADMIN',
                             },
                             {
                               id: 'USER',
                               name: 'USER',
                             },
                           ]}
                           validate={[required()]}
                           label="Role"
              />
            </Grid>
            <Grid xs={6}>
              <TextInput source="id" validate={[required()]} label="Id" readOnly fullWidth />
              <TextInput fullWidth
                         source="username"
                         validate={[required()]}
                         label="User name"
                         readOnly
              />
            </Grid>
          </Grid>
        </Box>
      </SimpleForm>
    </Edit>
  )
}
