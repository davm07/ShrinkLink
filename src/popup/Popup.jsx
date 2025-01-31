/* eslint-disable no-undef */
'use client'
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import './Popup.css'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { useState } from 'react'

function Popup() {
  const [activeTab, setActiveTab] = useState('shrink')
  const [links, setLinks] = useState([])

  useEffect(() => {
    if(chrome && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(['links'], (result) => {
        if (result.links) {
          setLinks(result.links)
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
            <div className='flex flex-col'>
              <div className='my-3 flex-1'>
                <label htmlFor='PlainUrl' className='text-foreground mb-1.5 block text-lg'>Paste your URL</label>
                <input type='url' className='block border-2 border-borderInput rounded-lg w-full p-3 bg-transparent text-foreground text-lg' id='PlainUrl' name='PlainUrl'/>
                <button className='bg-btn text-btnText rounded-lg px-4 py-2  mt-2.5 text-lg' type='button'>Shrink URL</button>
              </div>
              <div className='my-3 flex-1'>
                <label htmlFor='ShortenedUrl' className='text-foreground mb-1.5 block text-lg'>Shortened URL</label>
                <input type='text' className='block border-2 border-borderInput rounded-lg w-full p-3 bg-transparent text-foreground text-lg' id='ShortenedUrl' name='ShortenedUrl' readOnly/>
                <button className='bg-btn text-btnText rounded-lg px-4 py-2  mt-2.5 text-lg' type='button'>Copy URL</button>
              </div>
              <div className='flex justify-end flex-1'>
                <button className='text-foreground font-permanentMarker inline text-lg' onClick={() => setActiveTab('history')}>Go to URL history <ChevronRight className='inline'/></button>
              </div>
            </div>
          )
        }
        {
          activeTab === 'history' && (
            <div className='flex flex-col h-full'>
              <div className='my-3'>
                <p className='text-foreground font-bold text-lg'>My shortned URLs</p>
              </div>
              <div className='my-3 overflow-hidden'>
                <ul className='flex flex-col gap-3 overflow-y-auto max-h-44 pr-2'>
                  {
                    links.map((link, index) => (
                      <li key={index} className='text-foreground text-lg flex justify-between flex-row items-center'>
                        <a href={link.shortened} target='_blank' rel='noopener noreferrer'>{link.shortened}</a>
                        <button className='bg-btn text-btnText text-lg px-4 py-2 rounded-lg' type="button">Copy URL</button>
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className='my-2'>
                <button className='bg-btn text-btnText rounded-lg px-4 py-2  mt-2.5 text-lg' type='button'>Delete URLs</button>
              </div>
              <div className='flex justify-start my-2'>
                <button className='text-foreground font-permanentMarker inline text-lg' onClick={() => setActiveTab('shrink')}><ChevronLeft className='inline'/> Go to main view</button>
              </div>
            </div>
          )
        }
      </div>
    </article>
  )
}

export default Popup
