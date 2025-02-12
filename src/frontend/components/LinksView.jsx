'use client'
import { ChevronLeft } from 'lucide-react'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { getUserUrls, deleteUserUrls } from '../services/apiService'

function LinksView( { changeView, userId }) {
    const [links, setLinks] = useState([])
    const [loading, setLoading] = useState(false)
    const [copied, setCopied] = useState({})
    const [deleted, setDeleted] = useState(false)

    useEffect(() => {
    const fetchLinks = async () => {
      try {
          setLoading(true);
          const userUrls = await getUserUrls(userId);
          setLinks(userUrls);
        } catch (error) {
          console.error("Error fetching URLs:", error);
        } finally {
          setLoading(false);
        }
      };

      if (userId) {
        fetchLinks();
      }
    }, [userId]);

    const handleCopy = (shrinkUrl) => {
        navigator.clipboard.writeText(shrinkUrl);
        setCopied((prevCopied) => ({
          ...prevCopied,
          [shrinkUrl]: true
        }))
        setTimeout(() => {
          setCopied((prevCopied) => ({
            ...prevCopied,
            [shrinkUrl]: false
          }))
        }, 2000)
    }

    const handleDelete = async (userId) => {
      if (links.length === 0) return;

      try {
        setDeleted(true)
        await deleteUserUrls(userId);
        setLinks([]);
        setDeleted(false)
      } catch (error) {
        console.error("Error deleting URLs:", error);
      }
    };

    return (
        <div className='flex flex-col h-full'>
              <div className='my-3'>
                <p className='text-foreground font-bold text-lg'>My shortned URLs</p>
              </div>
              <div className='my-3 overflow-hidden'>
                {
                  loading ? (
                    <p className='h-44 text-foreground text-lg'>Loading URLs...</p>
                  ) : links.length === 0 ? (
                    <p className='h-44 text-foreground text-lg'>No URLs found</p>
                  ) : (
                    <ul className='flex flex-col gap-3 overflow-y-auto max-h-44 h-44 pr-2'>
                      {
                        links.map((link, index) => (
                          <li key={index} className='text-foreground text-lg flex justify-between flex-row items-center gap-2'>
                            <p className='truncate flex-grow w-[5ch]'>{link}</p>
                            <button className='bg-btn text-btnText text-lg px-4 py-2 rounded-lg'
                            type="button"
                            onClick={() => handleCopy(link)}>{copied[link] ? 'Copied!' : 'Copy URL'}</button>
                          </li>
                        ))
                      }
                    </ul>
                  )
                }
              </div>
              <div className='my-2'>
                <button className={`bg-btn text-btnText rounded-lg px-4 py-2  mt-2.5 text-lg ${links.length === 0 ? 'opacity-50' : ''}`}
                type='button'
                disabled={links.length === 0}
                onClick={() => handleDelete(userId)}>{deleted ? 'Deleting...': 'Delete URLs'}</button>
              </div>
              <div className='flex justify-start my-2'>
                <button className='text-foreground font-permanentMarker inline text-lg' onClick={changeView}><ChevronLeft className='inline'/> Go to main view</button>
              </div>
            </div>
    )
}
LinksView.propTypes = {
  changeView: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired

}

export default LinksView
