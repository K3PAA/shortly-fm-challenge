const toggleBtn = document.querySelector('.nav-toggle')
const toggleElement = document.querySelector('.active-elements')
const navList = document.querySelectorAll('.primary-navigation-list li a')
const navButtons = document.querySelectorAll('.buttons-container button')

toggleBtn.addEventListener('click', () => {
  const visibility = toggleElement.getAttribute('data-visible')

  if (visibility === 'false') {
    toggleElement.setAttribute('data-visible', true)
    toggleBtn.setAttribute('aria-expanded', true)
  } else {
    toggleElement.setAttribute('data-visible', false)
    toggleBtn.setAttribute('aria-expanded', false)
  }
})

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    toggleElement.setAttribute('data-visible', false)
    toggleBtn.setAttribute('aria-expanded', false)
  })
})

navList.forEach((link) => {
  link.addEventListener('click', () => {
    toggleElement.setAttribute('data-visible', false)
    toggleBtn.setAttribute('aria-expanded', false)
  })
})

const shortenInput = document.querySelector('.shorten--input')
const shortenBtn = document.querySelector('.shorten--btn')
const shortenListHolder = document.querySelector('.shorten-links')
const addictionalInfo = document.querySelector('.addictional-info')

function createElem(type, cl, text) {
  const el = document.createElement(type)

  const classes = cl.split(' ')
  classes.forEach((cl) => {
    el.classList.add(cl)
  })

  el.innerHTML = text

  return el
}

function copyLink(liBtn, short) {
  liBtn.innerHTML = `Copied !`
  liBtn.classList.add('copied')
  navigator.clipboard.writeText(short)

  setTimeout(() => {
    liBtn.classList.remove('copied')
    liBtn.innerHTML = 'Copy'
  }, 3000)
}
function addShortenLink(e, long, short) {
  e.preventDefault()

  const li = document.createElement('li')
  li.classList.add('shorten-item')

  li.append(createElem('p', 'long-link', long))
  li.append(createElem('p', 'short-link', short))
  li.append(createElem('button', 'button copy-btn button--rd-sm', 'Copy !'))

  const liBtn = li.querySelector('button')
  liBtn.addEventListener('click', () => copyLink(liBtn, short))

  shortenListHolder.append(li)
}

function showError() {
  shortenInput.classList.add('danger')
  addictionalInfo.innerHTML = 'Please add a link'

  setTimeout(() => {
    shortenInput.classList.remove('danger')
    addictionalInfo.innerHTML = ''
  }, 3000)
}

const mainForm = document.querySelector('.main-form')

mainForm.addEventListener('submit', submitForm)

async function submitForm(e) {
  e.preventDefault()
  const inputValue = shortenInput.value

  try {
    const resp = await fetch(
      `https://api.shrtco.de/v2/shorten?url=${inputValue}`
    )

    if (!resp.ok) {
      throw new Error('Please add a link')
    }
    const data = await resp.json()

    addShortenLink(e, inputValue, data.result.short_link)
    console.log(shortenListHolder)
    shortenInput.value = ''
  } catch (err) {
    console.log(err)

    showError()
  }
}
