import React from 'react'
import { Menu } from 'react-admin'

export const AdminMenu = () => (
  <Menu>
    <Menu.DashboardItem />
    <Menu.ResourceItem name="users" />
    <Menu.ResourceItem name="playerrs" />
    <Menu.ResourceItem name="banks" />
    <Menu.ResourceItem name="recharges" />
    <Menu.ResourceItem name="withdraws" />
    <Menu.ResourceItem name="events" />
    <Menu.ResourceItem name="tables" />
  </Menu>
)
