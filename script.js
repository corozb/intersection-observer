const cards = document.querySelectorAll('.card')
const lastCardElement = document.querySelector('.card:last-child')
const cardContainer = document.querySelector('.card-container')

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('show', entry.isIntersecting)
      // if (entry.isIntersecting) observer.unobserve(entry.target) // this delete the animation once the element is showed on screen this can be used in lazy loading just while charge data;
    })
  },
  {
    // rootMargin: '100px', this is a margin on bottom that allow precharge the element before to be displayed, an image for example
    threshold: 1, // this value can be between 0 and 1, 0 is by default and means that the element is visible just when is intersected and 1 is when the element is 100% intersected and can be visible
  }
)

// INFINITY SCROLL
const lastCardObserver = new IntersectionObserver(
  (entries) => {
    const lastCard = entries[0]
    if (!lastCard.isIntersecting) return
    loadNewCard()
    lastCardObserver.unobserve(lastCard.target)
    lastCardObserver.observe(lastCardElement)
  },
  {
    rootMargin: '100px', //it starts creation of new cards before you actually get the bottom of the list, depending on how slow your network request is you can make it bigger or smaller
  }
)

lastCardObserver.observe(lastCardElement)

cards.forEach((card) => observer.observe(card))

function loadNewCard() {
  for (let i = 0; i < 10; i++) {
    const card = document.createElement('div')
    card.textContent = 'Here I go Again'
    card.classList.add('card')
    observer.observe(card)
    cardContainer.append(card)
  }
}
