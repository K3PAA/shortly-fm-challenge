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
