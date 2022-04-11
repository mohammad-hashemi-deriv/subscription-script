var mySocket = new WebSocket(
  "wss://green.binaryws.com/websockets/v3?app_id=16929&l=en&brand=deriv"
)

mySocket.onmessage = function (msg) {
  const response = JSON.parse(msg.data)
  if (response.msg_type === "error") {
    mySocket.close()
  }
  if (response.msg_type === "verify_email") {
    window.location.href = "http://deriv.com"
  }
}

var form = document.getElementsByTagName("form")
var input = document.querySelectorAll("input[type=email]")[0]
var button = document.getElementsByClassName("lp-button-react")[0]
var checkbox = document.getElementsByClassName("lp-form-react-checkbox")[0]

button.disabled = true

var is_checked = false
var is_filled = false

function checkEnableButton() {
  if (is_checked && is_filled) {
    button.disabled = false
  }
}

checkbox.addEventListener("change", function (event) {
  is_checked = event.target.checked
  checkEnableButton()
})

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/
  return re.test(email)
}

input.addEventListener("change", function (event) {
  is_filled = validateEmail(event.target.value)
  if (is_filled) {
    checkEnableButton()
  }
})

var date = new Date()
var formatted_date = date.toISOString().split("T")[0]

form[0].addEventListener("submit", function (e) {
  mySocket.send(
    JSON.stringify({
      verify_email: input.value,
      type: "account_opening",
      url_parameters: {
        date_first_contact: formatted_date,
        signup_device: "desktop",
        utm_source: "null",
        utm_content: "forex-ebook",
      },
    })
  )
  e.preventDefault()
})
