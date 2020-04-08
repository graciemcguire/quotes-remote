document.addEventListener('DOMContentLoaded', init)

const quoteList = document.getElementById('quote-list')
const formId = document.querySelector('#new-quote-form')
const url = 'http://localhost:3000/quotes/'

function init() {
  getQuotes()
}

function createNode(element){
  return document.createElement(element)
}

function appendStuff(parent, el){
  return parent.append(el)
}

function getQuotes(){
  fetch(url)
  .then(response => response.json())
  .then(quoteArray => quoteArray.forEach(quote => renderQuote(quote)))
}

function renderQuote(quoteObj){
  let quoteCard = createNode('li')

  quoteCard.className = 'quote-card'
  quoteCard.dataset.id = quoteObj.id
  quoteCard.addEventListener('click', quoteEvent)

  quoteCard.innerHTML = `<blockquote class="blockquote">
      <p class="mb-0">${ quoteObj.quote }</p>
      <footer class="blockquote-footer">${ quoteObj.author }</footer>
      <br>
      <button class='btn-success'>Likes: <span>${ quoteObj.likes }</span></button>
      <button class='btn-danger'>Delete</button>
    </blockquote>`
    appendStuff(quoteList, quoteCard)
}

formId.addEventListener('submit', newQuote)

function newQuote(event){
  event.preventDefault()

  let newQuote = event.target.querySelector('#new-quote').value
  let newAuthor = event.target.author.value

  let newQuoteObj = {
    author: newAuthor,
    quote: newQuote,
    likes: 0
  }
  postQuote(newQuoteObj)
}


function postQuote(newQuoteObj){
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newQuoteObj)
  })
  .then(response => response.json())
  .then(newQuoteObj => renderQuote(newQuoteObj))
}


function quoteEvent(event){
  let quoteId = parseInt(event.target.closest('li').dataset.id)
  if(event.target.className === 'btn-danger'){
    removeQuote(quoteId)
  } else if (event.target.className === 'btn-success'){
    likeQuote(quoteId)
  }
}

function removeQuote(quoteId){
  fetch(url + quoteId, {
    method: 'DELETE',
  })
  .then(response => {
    if(response.ok){
      return response.json()
    }
  })
  .then(event.target.closest('li').remove())
}


function likeQuote(quoteId){
  let like = event.target.querySelector('span').innerText
  let newLike = parseInt(like)
  newLike += 1
  let patchLike = event.target.querySelector('span').innerText = `${ newLike }`

  fetch(url + quoteId, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ likes: patchLike })
  })
  .then(response => response.json())
  .then(console.log)
}



//













//



///

///
