const encryptForm = document.querySelector('#encryptForm')
const userInput = document.querySelector('#userInput')
const encryptBtn = document.querySelector('#encryptBtn')
const decryptBtn = document.querySelector('#decryptBtn')
const placeholderInfo = document.querySelector('#placeholderInfo')
const decryptedInfo = document.querySelector('#decryptedInfo')
const decryptedText = document.querySelector('#decryptedText')
const decryptedCopyBtn = document.querySelector('#decryptedCopyBtn')
const warning = document.querySelector('#warning')

// ? Diccionario de datos
const encrypter = {
  a: 'enter',
  e: 'imes',
  i: 'ai',
  o: 'ober',
  u: 'ufat'
}
