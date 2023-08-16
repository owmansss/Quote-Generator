const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const author = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];

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
}
// Get Quotes from API
async function getQuotes(){
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{ 
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } catch (error){
        alert('404 Error')
    }
};

// function complete (){
//     quoteContainer.hidden = false;
//     loader.hidden = true;
// }

// function loading(){
//     loader.hidden = false;
//     quoteContainer.hidden = true;
// }

function tweetQuote(){
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${author.textContent}`;
    window.open(twitterURL, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
// 