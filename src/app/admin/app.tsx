'use client'

import { Admin, Resource } from 'react-admin'
import simpleRestProvider from 'ra-data-simple-rest'

import { RoomList } from './room/list'
import { RoomEdit } from './room/edit'
import { RoomCreate } from './room/create'

const dataProvider = simpleRestProvider(
  `${process.env.NEXT_PUBLIC_SERVER_URL}/api`
)

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="rooms"
        list={RoomList}
        create={RoomCreate}
        edit={RoomEdit}
        recordRepresentation="title"
      />
    </Admin>
  )
}

export default App
