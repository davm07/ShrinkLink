/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

'use client'
import React, { useEffect } from 'react'
import './Popup.css'
import { useState } from 'react'
import ShrinkView from '../components/ShrinkView'
import LinksView from '../components/LinksView.jsx'

function Popup() {
  const [activeTab, setActiveTab] = useState('shrink')
  const [links, setLinks] = useState([])
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    if(chrome && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(['links'], (result) => {
        if (result.links) {
          setLinks(result.links)
        }
      })
      chrome.storage.local.get(['userId'], (result) => {
        if (result.userId) {
          setUserId(result.userId)
        }
      })
    }
  })

  return (
    <article className='bg-background w-[420px] h-[440px]'>
      <div className='flex flex-col p-5 h-full'>
        <h1 className='font-permanentMarker text-3xl text-title'>ShrinkLink</h1>
        {
          activeTab === 'shrink' && (
            <ShrinkView changeView={() => setActiveTab('history')} userId={userId}/>
          )
        }
        {
          activeTab === 'history' && (
            <LinksView changeView={() => setActiveTab('shrink')} userId={userId} />
          )
        }
      </div>
    </article>
  )
}

export default Popup
