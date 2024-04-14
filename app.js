const qouteContainer=document.querySelector("#quote-container");

const qouteText=document.querySelector("#quote");

const authorText=document.querySelector("#author");

const twitterBtn=document.querySelector("#twitter");

const newQouteBtn=document.querySelector("#new-quote");

const loader=document.querySelector("#loader");



let apiQuotes=[];

function loading() {
    loader.hidden=false;
    qouteContainer.hidden=true;
}


function complete() {
    loader.hidden=true;
    qouteContainer.hidden=false;

}



function newQoute(){
    loading();

    const qoute= apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // console.log(qoute);
    if(!qoute.author){
        authorText.textContent ="Unknown";
    }else{
     authorText.textContent=qoute.author;   
    }
    
// check qoute length 
if( qoute.text.lenth >50 ){
    qouteText.classList.add('long-quote');
}else{
    qouteText.classList.remove('long-quote');  
}

    qouteText.textContent=qoute.text;
    complete();
}


async function getQuotes(){
    loading();

    const apiUrl ='https://jacintodesign.github.io/quotes-api/data/quotes.json';

    try{
const response = await fetch(apiUrl);
apiQuotes = await response.json();
newQoute();

}
    catch(error){
console.log(error)
    }
}




// tweet quote 
function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${qouteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}


// event listerner 
newQouteBtn.addEventListener('click', newQoute);
twitterBtn.addEventListener('click',tweetQuote);

getQuotes();
