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
    console.log('please select an image')
    return
  }

  form.style.display = 'block'
  filename.innerText = file.name

  imageView.style.display = 'block'
  imageView.src = file.path
}

// Check if image is right type
function isImageType(image) {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif']
  return validTypes.includes(image.type)
}

img.addEventListener('change', loadImage)