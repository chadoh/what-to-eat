const defaultMeals = `casserole
waffles
pasta
tacos
pizza
soup
dal`

let meals = localStorage.getItem('meals')
if (!meals) {
  meals = defaultMeals
}

const suggestion = document.querySelector('#meal')

if (suggestion) {
  const array = meals.split('\n')
  const randomMeal = array[Math.floor(Math.random() * array.length)]
  suggestion.innerHTML = randomMeal
}

const textarea = document.querySelector('textarea')
const saveButton = document.querySelector('#save')
const editButton = document.querySelector('#edit')
const editArea = document.querySelector('#edit-area')
if (editButton && editArea && textarea && saveButton) {
  editButton.addEventListener('click', () => {
    const editing = editArea.className === 'active'
    editArea.className = editing ? '' : 'active'
    if (!editing) textarea.focus()
  })

  textarea.value = meals
  saveButton.addEventListener('click', () => {
    localStorage.setItem('meals', textarea.value)
    window.location.reload(false)
  })
}
