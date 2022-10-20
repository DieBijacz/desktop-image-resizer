const form = document.querySelector('#img-form');
const img = document.querySelector('#img');
const outputPath = document.querySelector('#output-path');
const filename = document.querySelector('#filename');
const heightInput = document.querySelector('#height');
const widthInput = document.querySelector('#width');
const imageView = document.querySelector('#image-view')

function loadImage(e) {
  const file = e.target.files[0]
  if (!isImageType(file)) {
    alertError('Please select an image')
    return
  }

  // create image URL
  const image = new Image()
  image.src = URL.createObjectURL(file)

  // display form and image
  form.style.display = 'block'
  filename.innerText = file.name
  outputPath.innerText = path.join(os.homedir(), 'imageresizer')
  imageView.style.display = 'block'
  imageView.src = image.src

  // get imgae dimensions
  image.onload = function () {
    widthInput.value = this.width
    heightInput.value = this.height
  }
}

// send image data to main.js
function sendImage(e) {
  e.preventDefault()

  const width = widthInput.value
  const height = heightInput.value
  const imgPath = img.files[0].path

  if (!img.files[0]) {
    alertError('Please upload an image')
    return
  }
  if (width === '' || height === '') {
    alertError('Please fill in a height and width')
    return
  }

  // send ipcRenderer
  ipcRenderer.send('image:resize', {
    imgPath, width, height
  })
}

// catch image:done event
ipcRenderer.on('image:done', () => {
  alertSuccess('Image resized')
})

// HELPER FUNCITONS

// Check if image is right type
function isImageType(image) {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif']
  return validTypes.includes(image.type)
}

function alertError(message) {
  Toastify.toast({
    text: message,
    duration: 2000,
    close: false,
    style: {
      background: 'red',
      color: 'white',
      textAlign: 'center'
    }
  })
}

function alertSuccess(message) {
  Toastify.toast({
    text: message,
    duration: 2000,
    close: false,
    style: {
      background: 'green',
      color: 'white',
      textAlign: 'center'
    }
  })
}

img.addEventListener('change', loadImage)
form.addEventListener('submit', sendImage)