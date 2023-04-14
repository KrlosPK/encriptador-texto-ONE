const encryptForm = document.querySelector('#encryptForm')
const userInput = document.querySelector('#userInput')
const encryptBtn = document.querySelector('#encryptBtn')
const decryptBtn = document.querySelector('#decryptBtn')
const placeholderInfo = document.querySelector('#placeholderInfo')
const decryptedInfo = document.querySelector('#decryptedInfo')
const decryptedText = document.querySelector('#decryptedText')
const decryptedCopyBtn = document.querySelector('#decryptedCopyBtn')
const warning = document.querySelector('#warning')

// ? Diccionarios de datos
const encrypter = {
  a: 'ai',
  e: 'enter',
  i: 'imes',
  o: 'ober',
  u: 'ufat'
}
const decrypter = {
  ai: 'a',
  enter: 'e',
  imes: 'i',
  ober: 'o',
  ufat: 'u'
}

const copyToClipboard = () => {
  const el = document.createElement('textarea')
  el.value = decryptedText.textContent
  document.body.appendChild(el)
  el.select()
  navigator.clipboard.writeText(el.value)
  document.body.removeChild(el)

  // ? Mostrar mensaje popup de copiado
  decryptedCopyBtn.textContent = 'Copiado'
  decryptedCopyBtn.classList.add('copied')
}

const decrypt = (text) => {
  const regex = /ai|enter|imes|ober|ufat/g
  userInput.value = ''

  return text.replace(regex, (match) => decrypter[match])
}

const encrypt = (text) => {
  const encryptedText = []

  text.split('').map((el) => {
    encrypter[el] ? encryptedText.push(encrypter[el]) : encryptedText.push(el)
  })

  userInput.value = ''

  return encryptedText.join('')
}

const validateInput = (isEncrypt = true) => {
  const userText = userInput.value

  decryptedCopyBtn.textContent = 'Copiar'
  decryptedCopyBtn.classList.remove('copied')
  if (userText === '' || userText.trim() === '') {
    decryptedInfo.classList.add('hidden')
    placeholderInfo.classList.remove('hidden')
    warning.classList.add('warning')
    warning.textContent = 'El texto no puede estar vacío'
    return
  } else if (userText !== userText.toLowerCase()) {
    decryptedInfo.classList.add('hidden')
    placeholderInfo.classList.remove('hidden')
    warning.classList.add('warning')
    warning.textContent = 'El texto no puede tener mayúsculas'
    return
  } else if (/[áéíóú]/.test(userText)) {
    decryptedInfo.classList.add('hidden')
    placeholderInfo.classList.remove('hidden')
    warning.classList.add('warning')
    warning.textContent = 'El texto no puede tener acentos'
    return
  }

  isEncrypt ? (decryptedText.textContent = encrypt(userText)) : (decryptedText.textContent = decrypt(userText))

  decryptedInfo.classList.remove('hidden')
  placeholderInfo.classList.add('hidden')
}

encryptForm.addEventListener('submit', (e) => {
  e.preventDefault()
  validateInput()
})
encryptBtn.addEventListener('click', () => validateInput())
decryptBtn.addEventListener('click', () => validateInput(false))
decryptedCopyBtn.addEventListener('click', () => copyToClipboard())
// ? Validar el textarea con el enter y evitar que se haga el salto de línea
userInput.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    e.preventDefault()
    validateInput()
  }
})
