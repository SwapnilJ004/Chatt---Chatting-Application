import React from 'react'
import Chats from './Chats.jsx'
import LogoutButton from './LogoutButton.jsx'
import SearchInput from './SearchInput.jsx'

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <SearchInput />
      <div className="divider px-3"></div>

      <Chats />

      <LogoutButton />
    </div>
  )
}

export default Sidebar
