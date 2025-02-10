import { ChevronLeft } from 'lucide-react'
import PropTypes from 'prop-types'

function LinksView( { changeView, links }) {

    return (
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
                <button className='text-foreground font-permanentMarker inline text-lg' onClick={changeView}><ChevronLeft className='inline'/> Go to main view</button>
              </div>
            </div>
    )
}
LinksView.propTypes = {
  changeView: PropTypes.func.isRequired,
  links: PropTypes.arrayOf(PropTypes.shape({
    shortened: PropTypes.string.isRequired
  })).isRequired
}

export default LinksView
