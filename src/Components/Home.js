import React, { useEffect, useState } from 'react';
import 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export const Home = () => {
  const [quote, setQuote] = useState({text: '', author: ''});
  const [color, setColor] = useState('#ffffff');



  useEffect(() => {
    getRandomQuote();
    setColor(getRandomColor());
  }, []);

  const getRandomQuote = () => {
    axios.get('https://randomquotes-production.up.railway.app/api/quotes/random')
    .then((response) => {
      let {id, quote, authorModel, _links} = response.data;
      let author = authorModel.name;
      setQuote({text: quote, author: author});
    })
  };

  const getRandomColor = () => {
    const colorList = ['#AEAAE6', '#ACE8C0', '#FFF1AD', '#FFBA91', '#E88E8E'];
    const randomIndex = Math.floor(Math.random() * colorList.length);
    return colorList[randomIndex];
  };

  const handleNewQuote = () => {
    setColor(getRandomColor());
    getRandomQuote();
  };

  return (
    <div className='vh-100' style={{backgroundColor: color}}>
      <div id='quote-box' className='position-absolute top-50 start-50 translate-middle p-4 rounded-2' style={{backgroundColor: 'white', width: '40%'}}>
        <div className='m-2' style={{fontFamily: 'Raleway, sans-serif'}}>
          <p id='text' className='text-center fs-3' style={{color: color}}>{quote.text}</p>
          <p id='author' className='text-end' style={{color: color}}>- {quote.author}</p>
          <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
            <button className='me-md-2 p-2' style={{backgroundColor: color, border: 'none', color: 'white'}} onClick={handleNewQuote}>New Quote</button>
          </div>
        </div>
      </div>
    </div>
  )
}
