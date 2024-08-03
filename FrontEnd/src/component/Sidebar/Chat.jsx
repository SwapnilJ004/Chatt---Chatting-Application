import React from 'react'

const Chat = () => {
  return (
    <>
      <div className="flex gap-2 items-center hover:bg-blue-500 rounded p-2 py-1 cursor-pointer">
        <div className="avatar online">
            <div className="w-10 rounded-full">
                <img src="https://tse4.mm.bing.net/th?id=OIP.9HUsp7F1Yw_uu3rPDvCS3QHaHa&pid=Api&P=0&h=180" alt="" />
            </div>
        </div>

        <div className="flex flex-col flex-1">
            <div className="flex gap-3 justify-between">
                <p className="font-bold text-slate-700">Jon Snow</p>
                {/* <p className="text-x2">Just now</p> */}
            </div>
        </div>
      </div>
      
      <div className="divider my-0 py-1 h-1"></div>
    </>
  )
}

export default Chat
