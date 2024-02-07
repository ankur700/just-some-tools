export function clearContent(htmlElement, htmlElement2) {
  htmlElement.value ? (htmlElement.value = '') : null;
  htmlElement2.value ? (htmlElement2.value = '') : null;
}
export function copy(event, htmlElement) {
  doCopying(htmlElement, event);
}
function doCopying(copyText, event) {
  try {
    if (copyText.value.length > 0) {
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand('copy');
      event.target.classList.add('btn-success');
      event.target.innerHTML = 'Copied &#10003;';
      setTimeout(function () {
        event.target.innerHTML = 'Copy';
        event.target.classList.remove('btn-success');
      }, 2000);
    } else {
      event.target.classList.add('btn-error');
      event.target.innerHTML = 'Empty Text';
      setTimeout(function () {
        event.target.innerHTML = 'Copy';
        event.target.classList.remove('btn-error');
      }, 2000);
    }
  } catch (error) {
    event.target.style.color = 'red';
    event.target.innerHTML = 'Error Copying';
    console.log(error);
  }
}

export function calculateSize(img, maxWidth, maxHeight) {
  let width = img.width;
  let height = img.height;

  // calculate the width and height, constraining the proportions
  if (width > height) {
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width = Math.round((width * maxHeight) / height);
      height = maxHeight;
    }
  }
  return [width, height];
}

// Utility functions for demo purpose

export function displayInfo(file, htmlElement) {
  try {
    if (file.size) htmlElement.innerText = `Size: ${readableBytes(file.size)}`;
  } catch (error) {
    console.log(error);
  }
}

function readableBytes(bytes) {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    sizes.length - 1
  );
  const approx = bytes / 1024 ** exponent;
  const result =
    exponent === 0
      ? `${bytes} bytes`
      : `${approx.toFixed(2)} ${sizes[exponent]}`;

  return result;
}

export function compressImage(width, height, quality, blobUrl, MIME_TYPE) {
  const compressedImage = document.getElementById('compressedImage');
  const size = document.getElementById('compressedSize');
  const image = new Image();
  image.src = blobUrl;
  image.onerror = () => {
    URL.revokeObjectURL(image.src);
    alert('Failed to load and convert image');
  };
  image.onload = () => {
    URL.revokeObjectURL(image.src);
    const [newWidth, newHeight] = calculateSize(image, width, height);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.drawImage(image, 0, 0, newWidth, newHeight);
    canvas.toBlob(
      blob => {
        // Handle the compressed image. es. upload or save in local state
        displayInfo(blob, size);
        compressedImage.setAttribute('src', URL.createObjectURL(blob));
      },
      MIME_TYPE,
      quality
    );
  };
}
