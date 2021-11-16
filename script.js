//slider counter
const output = document.getElementById("val")
const slider = document.getElementById("slider")
let per = 0

output.innerHTML = slider.value + "%"
slider.oninput = function () 
{
  
  output.innerHTML = slider.value + "%"
  per = slider.value
  
  render()
}

//picking colour code from textbox
const color = document.getElementById("colour")
let color1 = ""
function key() //assigning value to first colour field
{
  let strippedcolor = color.value.replace("#", "")  //removing # from hex code of present
  strippedcolor = isValidHex(strippedcolor)  //checking for valid hex code or return false
  if (strippedcolor) 
  {
    document.getElementById("c1").style.background = "#" + strippedcolor //displaying colour in c1 field
    color1 = strippedcolor  //passing VALID hex code to global variable
    render()
  } 
  else 
  {
    document.getElementById("c1").style.background = "none"
    document.getElementById("c2").style.background = "none"
    document.getElementById("answer").innerHTML = ""
    color1 = ""
  }
}

function isValidHex(color) {
  let newcolor
  let valid = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f']
  color = color.toLowerCase()
  for (let i = 0;  i < color.length; i++) //validate
  {
    if (!valid.includes(color[i])) {
      return false
    }
  }
  if (color.length === 3) //convert length from 3 to 6
  {
    newcolor = color[0] + color[0] + color[1] + color[1] + color[2] + color[2]
    return newcolor
  }
  if (color.length === 6) //checks for length of 6
  {
    return color
  }
  return false
}

function alterColor(shade, per) 
{
  const { r, g, b } = HexToRGB(shade)

  let amount = Math.floor((per / 100) * 255)  // adding percentage to rgb code
  
  if(toggleBtn.classList.contains("toggled"))
  {
    amount = amount * (-1)
  }

  const R = validRange(r + amount)
  const G = validRange(g + amount)
  const B = validRange(b + amount)

  return RGBToHex(R, G, B)
}
function HexToRGB(hex) //convert Hex code into RGB
{
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return { r, g, b }
}
function RGBToHex(r, g, b) //convert RGB to hex
{
  const fp = ("0" + r.toString(16)).slice(-2)  //adding 0 in front and taking last 2 digit
  const sp = ("0" + g.toString(16)).slice(-2)
  const tp = ("0" + b.toString(16)).slice(-2)
  return "#" + fp + sp + tp
}
function validRange(val) // checking conversion range is between 0-255 or not
{
  if (val > 255) return 255
  if (val < 0) return 0
  return val
}

function result(hex) 
{
  document.getElementById("c2").style.background = hex
  document.getElementById("answer").innerHTML = hex
}

//toggle button functions

const toggleBtn = document.getElementById("toggleBtn")
const lighten = document.getElementById("lightenText")
const darken = document.getElementById("darkenText")

toggleBtn.addEventListener('click',function(){
  if(toggleBtn.classList.contains("toggled"))
  {
    toggleBtn.classList.remove("toggled")
    lighten.classList.remove("unselected")
    darken.classList.add("unselected")
  }
  else
  {
    toggleBtn.classList.add("toggled")
    lighten.classList.add("unselected")
    darken.classList.remove("unselected")
  }
  render()
})

function render()
{
  if(alterColor(color1,per) != "#aNaNaN")
  {
    result(alterColor(color1, per))
  }
}