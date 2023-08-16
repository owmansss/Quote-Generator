const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const author = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];

// get Quotes by API using async
async function getQuote(){
    const proxyURL = 'https://cors-anywhere.herokuapp.com'
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyURL + '/' + apiURL);
        const data = await response.json();
        author.innerText = data.quoteAuthor;
        quoteText.innerText = data.quoteText;
    } catch(error){
        console.log('404 ', error)
    }
};



function newQuote(){
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if(!quote.author){
        author.textContent = 'Anonymous'
    } else{
        author.textContent = quote.author;
    };
    if(quote.text.length > 50){
        quoteText.classList.add('long-quote');
    } else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
};

function tweetQuote(){
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${author.textContent}`;
    window.open(twitterURL, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
 
