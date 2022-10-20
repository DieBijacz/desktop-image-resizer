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