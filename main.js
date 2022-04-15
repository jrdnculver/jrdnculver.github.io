var person = document.getElementById("maincontentaddon").getElementsByTagName("img")[0]

var width = person.style.width = '50px'
var height = person.style.height = '50px'
var left = person.style.left = '48%'
var right = person.style.top = '70%'


var setting = setInterval(changePixel, 500)

function changePixel(){
    width = modifyPixel(width)
    height = modifyPixel(height)
    person.style.width = width
    person.style.height = height
}

function modifyPixel(pxValue) {
   pxValue = pxValue.replace("px", "")
   pxValue = Number(pxValue)
   pxValue = pxValue + 10
   pxValue = String(pxValue) + 'px'
   return pxValue
}
