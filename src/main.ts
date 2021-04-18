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

const suggestionEl = document.querySelector('#suggestion')
if (!suggestionEl) throw new Error('no #suggestion element found; aborting')

async function suggest () {
  const possibilities = getAll()
  const suggestion = possibilities[
    Math.floor(Math.random() * possibilities.length)
  ]
  suggestionEl.innerHTML = suggestion
}

function configureEditor () {
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

    textarea.value = getAll({ raw: true })
    saveButton.addEventListener('click', () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, textarea.value)
      window.location.reload(false)
    })
  }
}

configureEditor()
setTimeout(() => suggest(), 750)


