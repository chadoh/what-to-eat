const suggestionEl = document.querySelector('#suggestion')
const textarea = document.querySelector('textarea')
const saveButton = document.querySelector('#save')
const editButton = document.querySelector('#edit')
const againButton = document.querySelector('#again')
const editArea = document.querySelector('#edit-area')
if (!suggestionEl || !textarea || !saveButton || !editButton || !againButton || !editArea) {
  throw new Error('cannot find expected DOM elements')
}

const defaultPossibilities = `casserole
waffles
pasta
tacos
pizza
soup
dal`

const LOCAL_STORAGE_KEY = 'meals'

function getAll ({ raw = false } = {}) {
  const possibilities = localStorage.getItem(LOCAL_STORAGE_KEY) || defaultPossibilities
  if (raw) return possibilities
  return possibilities.split('\n')
}

function suggest () {
  againButton.style.display = 'none'
  suggestionEl.innerHTML = '<span class="loader"></span>'

  const possibilities = getAll()
  const suggestion = possibilities[
    Math.floor(Math.random() * possibilities.length)
  ]

  setTimeout(() => {
    suggestionEl.innerHTML = suggestion
    againButton.style.display = null
  }, 750)
}

function toggleEditor () {
  const editing = editArea.className === 'active'
  editArea.className = editing ? '' : 'active'
  if (!editing) textarea.focus()
}

textarea.value = getAll({ raw: true })
saveButton.addEventListener('click', () => {
  localStorage.setItem(LOCAL_STORAGE_KEY, textarea.value)
  toggleEditor()
  suggest()
})

againButton.addEventListener('click', suggest)
editButton.addEventListener('click', toggleEditor)

suggest()
