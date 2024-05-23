let Saturate = document.getElementById('Saturate');
let Contrast = document.getElementById('Contrast');
let Brightness = document.getElementById('Brightness');
let Sepia = document.getElementById('Sepia');
let Grayscale = document.getElementById('Grayscale');
let Blur = document.getElementById('Blur');
let Hue_Rotate = document.getElementById('Hue-Rotate');
let download = document.getElementById('download');
let upload = document.getElementById('upload');
let image = document.querySelector('.img');
let imgBox = document.querySelector('.imgbox');
let reset = document.querySelector('span');
let filters = document.getElementById('filters');

window.onload = function() {
  download.style.display = 'none';
  reset.style.display = 'none';
  imgBox.style.display = 'none';
  filters.style.display = 'none';
}

upload.onchange = function() {
  download.style.display = 'block';
  reset.style.display = 'block';
  imgBox.style.display = 'block';
  filters.style.display = 'block';
  resetFilters();
  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = function() {
    image.src = file.result;
    image.onload = function() {
      applyFilters(); // تطبيق الفلاتر على الصورة المحملة
    };
    image.style.border = '3px dashed #fff';
    download.href = file.result; // تعيين رابط التحميل
  }
}

let filterInputs = document.querySelectorAll('#filters input[type="range"]');
filterInputs.forEach(input => {
  input.addEventListener('input', applyFilters);
});

reset.addEventListener('click', resetFilters);

function applyFilters() {
  image.style.filter = getFilterValue();
}

function getFilterValue() {
  return `
    saturate(${Saturate.value}%)
    contrast(${Contrast.value}%)
    brightness(${Brightness.value}%)
    sepia(${Sepia.value}%)
    grayscale(${Grayscale.value})
    blur(${Blur.value}px)
    hue-rotate(${Hue_Rotate.value}deg)
  `;
}

function resetFilters() {
  Saturate.value = 100;
  Contrast.value = 100;
  Brightness.value = 100;
  Sepia.value = 0;
  Grayscale.value = 0;
  Blur.value = 0;
  Hue_Rotate.value = 0;

  image.style.filter = getFilterValue();
}
