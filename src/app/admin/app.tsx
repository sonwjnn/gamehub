'use client'

import { AdminLayout } from './_components/layout'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import WalletIcon from '@mui/icons-material/Wallet'
import EventSeatIcon from '@mui/icons-material/EventSeat'
import MeetingTableIcon from '@mui/icons-material/MeetingRoom'
import RememberMeIcon from '@mui/icons-material/RememberMe'
import GroupIcon from '@mui/icons-material/Group'

import { Admin, Resource } from 'react-admin'
import simpleRestProvider from 'ra-data-simple-rest'

import { UserList } from './user/list'
import { UserEdit } from './user/edit'
import { UserCreate } from './user/create'

import { EventsList } from './event/list'
import { EventsEdit } from './event/edit'
import { EventsCreate } from './event/create'

import { BanksList } from './bank/list'
import { BanksEdit } from './bank/edit'
import { BanksCreate } from './bank/create'

import { RechargeList } from './recharge/list'
import { RechargeEdit } from './recharge/edit'
import { RechargeCreate } from './recharge/create'

import { WithdrawList } from './withdraw/list'
import { WithdrawEdit } from './withdraw/edit'
import { WithdrawCreate } from './withdraw/create'

import { TableList } from './table/list'
import { TableEdit } from './table/edit'
import { TableCreate } from './table/create'

// import { SettingsList } from './settings/list'
// import { SettingsEdit } from './settings/edit'
// import { SettingsCreate } from './settings/create'

const dataProvider = simpleRestProvider(
  `${process.env.NEXT_PUBLIC_SERVER_URL}/api`
)

const App = () => {
  return (
    <Admin dataProvider={dataProvider} layout={AdminLayout}>
      <Resource
        icon={GroupIcon}
        name="users"
        list={UserList}
        create={UserCreate}
        edit={UserEdit}
        recordRepresentation="name"
      />

      <Resource
        icon={AccountBalanceIcon}
        name="banks"
        list={BanksList}
        create={BanksCreate}
        edit={BanksEdit}
        recordRepresentation="name"
      />

      <Resource
        icon={AccountBalanceWalletIcon}
        name="recharges"
        list={RechargeList}
        create={RechargeCreate}
        edit={RechargeEdit}
        recordRepresentation="name"
      />

      <Resource
        icon={WalletIcon}
        name="withdraws"
        list={WithdrawList}
        create={WithdrawCreate}
        edit={WithdrawEdit}
        recordRepresentation="name"
      />

      <Resource
        icon={EventSeatIcon}
        name="events"
        list={EventsList}
        create={EventsCreate}
        edit={EventsEdit}
        recordRepresentation="name"
      />

      <Resource
        icon={MeetingTableIcon}
        name="tables"
        list={TableList}
        create={TableCreate}
        edit={TableEdit}
        recordRepresentation="name"
      />

      {/*<Resource*/}
      {/*  name="settings"*/}
      {/*  list={SettingsList}*/}
      {/*  create={SettingsCreate}*/}
      {/*  edit={SettingsEdit}*/}
      {/*  recordRepresentation="name"*/}
      {/*/>*/}
    </Admin>
  )
}

export default App
