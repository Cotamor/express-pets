async function start() {
  const weatherPromise = await fetch(
    'https://api.weather.gov/gridpoints/MFL/110,50/forecast'
  )
  const weatherData = await weatherPromise.json()

  const ourTemperature = weatherData.properties.periods[0].temperature
  document.querySelector('#temperature-output').textContent = ourTemperature
}

start()

// pet filter button code
const allButtons = document.querySelectorAll('.pet-filter button')

allButtons.forEach((el) => {
  el.addEventListener('click', handleButtonClick)
})

function handleButtonClick(e) {
  // remove active class from any and all buttons
  allButtons.forEach((el) => el.classList.remove('active'))

  // add active class to the specific button that just got clicked
  e.target.classList.add('active')

  // actually filter the pets down below
  const currentFilter = e.target.dataset.filter
  document.querySelectorAll('.pet-card').forEach((el) => {
    if (currentFilter == el.dataset.species || currentFilter == 'all') {
      el.style.display = 'grid'
    } else {
      el.style.display = 'none'
    }
  })
}

document.querySelector('.form-overlay').style.display = ''

// Open and close contact form
function openOverlay(el) {
  document.querySelector('.form-content').dataset.id= el.dataset.id
  document.querySelector('.form-photo p strong').textContent =
    el.closest('.pet-card').querySelector('.pet-name').textContent.trim() + '.'

  document.querySelector('.form-photo img').src = el
    .closest('.pet-card')
    .querySelector('.pet-card-photo img').src

  document
    .querySelector('.form-overlay')
    .classList.add('form-overlay--is-visible')
}

document
  .querySelector('.close-form-overlay')
  .addEventListener('click', closeOverlay)

function closeOverlay() {
  document
    .querySelector('.form-overlay')
    .classList.remove('form-overlay--is-visible')
}

document.querySelector('.form-content').addEventListener('submit', handleFormSubmit)

async function handleFormSubmit (e) {
  e.preventDefault()
  const userValues = {
    petId: e.target.dataset.id,
    name: document.querySelector('#name').value,
    email: document.querySelector('#email').value,
    secret: document.querySelector('#secret').value,
    comment: document.querySelector('#comment').value
  }
  
  console.log(userValues)

  
  try {
    const response = await fetch("/submit-contact", {
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userValues)
    })
    const message = await response.json()
    console.log(message)
  } catch (e) {
    console.log(e)
  }

}
