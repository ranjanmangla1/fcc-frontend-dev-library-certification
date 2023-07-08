import './App.css'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import html2canvas from 'html2canvas'
import { Tooltip } from 'react-tooltip'

export default function App() {
  const [quotes, setQuotes] = useState()
  const [quote, setQuote] = useState()
  const [author, setAuthor] = useState()
  const quoteRef = useRef()
  
  useEffect(() => {
        async function getQuotes() {
            const res = await fetch("https://type.fit/api/quotes")
            const data = await res.json()
            setQuotes(data)
             const randomNumber = Math.floor(Math.random() * data.length)
            const quoteN = data[randomNumber].text
            const authorN = data[randomNumber].author
            setQuote(quoteN)
            setAuthor(authorN)
            getQuote(data)
        }
        getQuotes()
    }
  , [])

  function getQuote() {
    const randomNumber = Math.floor(Math.random() * quotes.length)
    const quoteN = quotes[randomNumber].text
    const authorN = quotes[randomNumber].author
    setQuote(quoteN)
    setAuthor(authorN)
  }
  
  function handleDownload() {
    html2canvas(quoteRef.current).then((canvas) => {
      const imageData = canvas.toDataURL("image/png"); 
      const link = document.createElement("a");
      setImage(imageData)
      link.href = imageData; 
      link.download = "quote.png"; 
      document.body.appendChild(link); 
      link.click();
      document.body.removeChild(link); 
    });
  };

  return (
    <main>
      <div className='heading'>
        <p>Random Quote Generator</p>
      </div>
      <div className="quote-box">
        <div className="quote" ref={quoteRef}>
          <p className="quote-para">
            <FontAwesomeIcon style={{marginRight: "10px"}} icon={faQuoteLeft} color='black' />
            <span style={{ textAlign: "center" }}>{quote}</span>
          </p>
          <p className='author'>
            - {author ? author : "unknown"} 
          </p>
        </div>
        <div className="buttons">
          <Tooltip id="Twitter" />
          <Tooltip id="Refresh" />
          <Tooltip id="Download" />
          <a 
             data-tooltip-id="Twitter" data-tooltip-content="Twitter"
              className="twitter-share-button"
              href={`https://twitter.com/intent/tweet?text=${quote}%0A-${author}%0A%23quotes`}
          >
              <FontAwesomeIcon icon={faTwitter} size="1x" title="Share it on Twitter" color="black" />
          </a>
            <button onClick={getQuote} data-tooltip-id="Refresh" data-tooltip-content="Refresh"><FontAwesomeIcon icon={faRefresh} title="Refresh" size="1x" color="black" data-tooltip="Refresh" data-tooltip-position="bottom" /></button>
            <button onClick={handleDownload} data-tooltip-id="Download" data-tooltip-content="Download"><FontAwesomeIcon icon={faDownload} title='Download' size="1x" color="black" /></button>
        </div>
      </div>
    </main>
  )
}