import React from 'react'
import ChatRoom from '../components/ChatRoom'
import Chats from '../components/Chats'

const Dashboard = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-black text-white">
      <h1>
        <Chats />
      </h1>
    </div>
  )
}

export default Dashboard
