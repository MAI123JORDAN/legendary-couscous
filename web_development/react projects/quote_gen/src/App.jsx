import React, { useState,  useEffect } from 'react'
import './App.css'

function App() {
  // State for the quote data from the API
  const [quote, setQuote] = useState({text: '', author: ''});
  // State to track if the data is currently loading
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(true);

  // Func: Fetch data from the external API
  const getQuote = async () => {
    setFade(false);  // Start by hiding the current quote
    setLoading(true); // State loading
    try {
      const response = await fetch('https://zenquotes.io/api/random');
      const data = await response.json();

      // Small delay to let the 'fade-out' happen before updating text
      setTimeout(() => {
        setQuote({ text: data.content, author: data.author });
        setLoading(false);
        setFade(true); // 2. Trigger the 'fade-in'
      }, 400);

    } catch (error) {
      console.error("API Error", error);
      setLoading(false);
      setFade(true);
    }
    setLoading(false);
  };

  // Run the fetch once when the component mounts
  useEffect(() => {
    getQuote();
  }, []);

  // Func: Share on X
  const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.text} - ${quote.author}`;
    // Opens a new browser tab with the tweet pre-filled
    window.open(twitterUrl, '_blank');
  }

  // Func: Copy to Clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`"${quote.text}" -- ${quote.author}`);
    alert("Wisdom copied to clipboard");
  }

  return (
    <div className="quote-wrapper">
      {/* Use a template literal to toggle the 'visible' class */}
      <div className={`quote-box ${fade ? 'visible' : 'hidden'}`}>
        {loading ? (
          <div className="loader">FETCHING_WISDOM...</div>
        ) : (
          <>
            <h1 className="quote-text">"{quote.text}"</h1>
            <p className="quote-author">-- {quote.author}</p>

            <div className="quote-actions">
              <button className="new-quote-btn" onClick={getQuote}>
                NEXT_QUOTE
              </button>

              {/*  Utility Buttons */}
              <div className="utility-buttons">
                <button title="Copy to Clipboard" onClick={copyToClipboard}>
                  <i className="fa-regular fa-copy"></i>
                </button>
                <button title="Share on X" onClick={tweetQuote}>
                  <i className="fa-brands fa-x-twitter"></i>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App
