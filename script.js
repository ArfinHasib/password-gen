const length = document.getElementById("passwordLength")
const button = document.querySelector("button")
const passwords = document.querySelectorAll(".input--password")
const specialChar = document.getElementById("special-char")
const upperCase = document.getElementById("uppercase")
const message = document.querySelector(".error-message")

// Generate Random Items
const randomItem = (arr) => arr[(Math.random() * arr.length) | 0];

// Generate ranodm Chars
function randomChar() {
	let randomNumber = Math.round(126 - Math.random() * 93);
	let char = String.fromCharCode(randomNumber);
	return char;
}

// Make the Passwords
function makePassword(length, word) {
    let arrayOfChar = generateString(+length)
    const arrayOfNum = []

    for(let i = 0; i < length; i++) {
        arrayOfNum.push(i)
    }

    let Num = randomItem(arrayOfNum)

    if (upperCase.value == 1 && specialChar.value == 1) {
        for(let i =0; i < length; i++) {
            word += randomChar(length)
        }
    } else if (upperCase.value == 1 && specialChar.value == 0) {
        let item = randomItem(arrayOfChar)
        let item2 = randomItem(arrayOfChar)

        for(let i = Num; i < length; i++) {
            arrayOfChar.splice(arrayOfChar.indexOf(item), 1, item2.toUpperCase())
        }
        word+= arrayOfChar.join("")
    } else {
        word+= arrayOfChar.join("")
    }
    return word
}

// Generate the Password
function generatePassword() {
    let word = ""
    message.classList.remove("visibility")

    if (length.value <= 0) {
        return displayErrorMessage()
    } else if (length.value > 20) {
        return displayErrorLengthMessage()
    } else {
        passwords.forEach((password) => {
            return (password.value = makePassword(length.value, word))
        })
    }
}

// display error msg
function displayErrorMessage() {
    message.classList.add("visibility")
    message.classList.remove("message")
    message.textContent = "Password must have at least 01 character"
}

// display error length msg
function displayErrorLengthMessage() {
    message.classList.add("visibility")
    message.classList.remove("message")
    message.textContent = "Password will cause issues if more than 20 characters long"
}

// display the copied message
function copyMessage() {
    message.classList.add("visibility")
    message.classList.add("copy")
    message.classList.remove("message")
    message.textContent = "Password Copied"
}

// Copy to Clipboard
function copyToClipBoard() {
    // Select the text field
    this.select()
    this.setSelectionRange(0, 99999)

    // Copy the text inside of the text field
    navigator.clipboard.writeText(this.value)

    if (this.value != "") {
        copyMessage()
    }
}


button.addEventListener("click", generatePassword)

passwords.forEach((password) => {
    password.addEventListener("click", copyToClipBoard)
})

// Generate Strings
const generateString = (howLong) => {
    return Array(howLong).fill("").map((v) => Math.random().toString(36).charAt(2))
}
