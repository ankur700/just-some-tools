/**
 * Calculate the size of the image while constraining the proportions based on the given maximum width and height.
 *
 * @param {HTMLImageElement} img - the image dom element
 * @param {Number} maxWidth - the maximum width for the image
 * @param {Number} maxHeight - the maximum height for the image
 * @return {Array<Number>} an array containing the calculated width and height
 */
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
/**
 * Take a file and Display the file size
 *
 * @param {Blob} blob get blob size
 * @param {File} file get file size
 * @param {Number } originalImageSize
 * @param {Number } compressedImageSize
 * @param {Number } compressionRatio
 *
 */
export function displayInfo(file, blob, originalImageSize, compressedImageSize, compressionRatio) {
	// return `Size: ${readableBytes(file.size)}`;
	originalImageSize = file.size;
	compressedImageSize = blob.size;
	compressionRatio = Math.floor(file.size / blob.size);
}

/**
 *
 * @param {number} bytes - file size in bytes
 * @return {string} - file size in human readable format
 */

export function readableBytes(bytes) {
	const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), sizes.length - 1);
	const approx = bytes / 1024 ** exponent;
	const result = exponent === 0 ? `${bytes} bytes` : `${approx.toFixed(2)} ${sizes[exponent]}`;

	return result;
}

/**
 * @param {Number} MAX_WIDTH - width of the compressed image
 * @param {Number} MAX_HEIGHT - height of the compressed image
 * @param {Number} quality - quality to set for the image compression
 * @param {File} file - uploaded image file
 * @param {String} MIME_TYPE - Mime type of the compressed image
 * @param {Number } originalImageSize
 * @param {Number } compressedImageSize
 * @param {Number } compressionRatio
 * @param {string } filename
 */
export function compressImage(
	MAX_WIDTH,
	MAX_HEIGHT,
	quality,
	file,
	MIME_TYPE,
	originalImageSize,
	compressedImageSize,
	compressionRatio,
	filename
) {
	const compressedImage = document.getElementById('compressedImage');
	const blobURL = URL.createObjectURL(file);
	const image = new Image();
	image.src = blobURL;
	image.onerror = () => {
		URL.revokeObjectURL(image.src);
		alert('Failed to load and convert image');
	};

	image.onload = function () {
		// Calculate image size and Create canvas
		const [newWidth, newHeight] = calculateSize(image, MAX_WIDTH, MAX_HEIGHT);
		const canvas = document.createElement('canvas');
		canvas.width = newWidth;
		canvas.height = newHeight;
		const ctx = canvas.getContext('2d');
		ctx?.drawImage(image, 0, 0, newWidth, newHeight);
		canvas.toBlob(
			(blob) => {
				// Handle the compressed image.
				if (blob) {
					displayInfo(file, blob, originalImageSize, compressedImageSize, compressionRatio);
					const anchor = document.createElement('a');
					anchor.download = filename; // optional, but you can give the file a name
					anchor.href = URL.createObjectURL(blob);
					compressedImage?.setAttribute('src', anchor.href);
					anchor.click();
					// URL.revokeObjectURL(anchor.href);
				}
			},
			MIME_TYPE,
			quality / 100
		);
	};
}
