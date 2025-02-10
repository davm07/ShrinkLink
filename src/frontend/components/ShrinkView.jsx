import { ChevronRight } from 'lucide-react'
import PropTypes from 'prop-types'

function ShrinkView({changeView}) {
    return (
        <form className='flex flex-col'>
        <div className='my-3 flex-1'>
            <label htmlFor='PlainUrl' className='text-foreground mb-1.5 block text-lg'>Paste your URL</label>
            <input
            type='url'
            className='block border-2 border-borderInput rounded-lg w-full p-3 bg-transparent text-foreground text-lg'
            id='PlainUrl'
            name='PlainUrl'
            />
            <button
            className='bg-btn text-btnText rounded-lg px-4 py-2 mt-2.5 text-lg'
            type='submit'
            >
            Shrink URL
            </button>
        </div>
        <div className='my-3 flex-1'>
            <label htmlFor='ShortenedUrl' className='text-foreground mb-1.5 block text-lg'>Shortened URL</label>
            <input
            type='text'
            className='block border-2 border-borderInput rounded-lg w-full p-3 bg-transparent text-foreground text-lg'
            id='ShortenedUrl'
            name='ShortenedUrl'
            readOnly
            />
            <button
            className='bg-btn text-btnText rounded-lg px-4 py-2 mt-2.5 text-lg'
            type='button'
            >
            Copy URL
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
}

export default ShrinkView
