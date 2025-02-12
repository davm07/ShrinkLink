'use client'
import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import PropTypes from 'prop-types'
import { shortenUrl } from '../services/apiService'

function ShrinkView({changeView, userId}) {
    const [originalUrl, setOriginalUrl] = useState('')
    const [shrinkedUrl, setShrinkedUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();

       if (!originalUrl) return
       setLoading(true)

        const shrinkedUrl = await shortenUrl(originalUrl, userId)

        if (shrinkedUrl) {
            setShrinkedUrl(shrinkedUrl)
        } else {
            alert('Failed to shorten URL')
        }

        setLoading(false)
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(shrinkedUrl);
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 2000)
    }

    return (
        <form className='flex flex-col' onSubmit={handleSubmit}>
        <div className='my-3 flex-1'>
            <label htmlFor='PlainUrl' className='text-foreground mb-1.5 block text-lg'>Paste your URL</label>
            <input
            type='url'
            className='block border-2 border-borderInput rounded-lg w-full p-3 bg-transparent text-foreground text-lg'
            id='PlainUrl'
            name='PlainUrl'
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            />
            <button
            className='bg-btn text-btnText rounded-lg px-4 py-2 mt-2.5 text-lg'
            type='submit'
            disabled={!originalUrl || loading}
            >
            { loading ? 'Shrinking...' : 'Shrink URL'}
            </button>
        </div>
        <div className='my-3 flex-1'>
            <label htmlFor='ShortenedUrl' className='text-foreground mb-1.5 block text-lg'>Shortened URL</label>
            <input
            type='text'
            className='block border-2 border-borderInput rounded-lg w-full p-3 bg-transparent text-foreground text-lg'
            id='ShortenedUrl'
            name='ShortenedUrl'
            value={shrinkedUrl}
            readOnly
            />
            <button
            className={`bg-btn text-btnText rounded-lg px-4 py-2 mt-2.5 text-lg ${!shrinkedUrl ? 'opacity-50' : ''}`}
            type='button'
            onClick={handleCopy}
            disabled={!shrinkedUrl}
            >
            { copied ? 'Copied!' : 'Copy URL'}
            </button>
        </div>
        <div className='flex justify-end flex-1'>
            <button
            className='text-foreground font-permanentMarker inline text-lg'
            type='button'
            onClick={changeView}
            >
            Go to URL history <ChevronRight className='inline'/>
            </button>
        </div>
        </form>
    )
}
ShrinkView.propTypes = {
    changeView: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
}

export default ShrinkView
