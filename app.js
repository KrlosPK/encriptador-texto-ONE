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
  a: 'enter',
  e: 'imes',
  i: 'ai',
  o: 'ober',
  u: 'ufat'
}
const decrypter = {
  enter: 'a',
  imes: 'e',
  ai: 'i',
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
}

const decrypt = (text) => {
  const regex = /enter|imes|ai|ober|ufat/g
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

  if (userText === '' || userText.trim() === '') {
    decryptedInfo.classList.add('hidden')
    placeholderInfo.classList.remove('hidden')
    warning.textContent = 'El texto no puede estar vacío'
    return
  } else if (userText !== userText.toLowerCase()) {
    decryptedInfo.classList.add('hidden')
    placeholderInfo.classList.remove('hidden')
    warning.textContent = 'El texto no puede tener mayúsculas'
    return
  } else if (/[áéíóú]/.test(userText)) {
    decryptedInfo.classList.add('hidden')
    placeholderInfo.classList.remove('hidden')
    warning.textContent = 'El texto no puede tener acentos'
    return
  }

  isEncrypt ? (decryptedText.textContent = encrypt(userText)) : (decryptedText.textContent = decrypt(userText))

  warning.textContent = 'Ingresa el texto que desees encriptar o desencriptar'
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
