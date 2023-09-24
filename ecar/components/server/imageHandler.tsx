/*  FRONTEND FUNCTIONS FOR HANDLING IMAGE RESIZING

    This file contains 4 functions which
    work together to complete the following:
    1) calcSize()    |  calculate size of image
    2) reduceSize()  |  reduce size of image (if too large)
    3) processImage()|  process the image as new 'canvas'
    4) getBase64()   |  return the image as base64 string

    REQUIREMENTS:
    - Define image separately (example in uploadImage)
    - Have an understanding of url encoding files/images

*/


function calcSize(image: any) {
    let y = 1;
    if (image.endsWith('==')) {
        y = 2
    }
    const x_size = (image.length * (3 / 4)) - y
    return Math.round(x_size / 1024)
}
    
async function reduceSize(base64Str: any, MAX_WIDTH = 30, MAX_HEIGHT = 30) {
let resized_base64 = await new Promise((resolve) => {
    const img = require('./createImage')
    img.src = base64Str
    img.onload = () => {
        let canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        if (width > height) {
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width
                width = MAX_WIDTH
            }
        } else {
            if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height
                height = MAX_HEIGHT
            }
        }
        canvas.width = width
        canvas.height = height
        let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        ctx.drawImage(img, 0, 0, width, height)
        console.log('URL ACCORDING TO reduceSize FUNCTION\n', canvas.toDataURL());
        resolve(canvas.toDataURL()) // this will return base64 image results after resize
    }
});

return resized_base64;
}

async function processImage(file: any, min_image_size = 50) {
const res = await getBase64(file);
if (res) {
    const old_size = calcSize(res);
    if (old_size > min_image_size) {
        const resized = await reduceSize(res);
        const new_size = calcSize(resized)
        console.log('new_size=> ', new_size, 'KB');
        console.log('old_size=> ', old_size, 'KB');
        return resized;
    } else {
        console.log('image already small enough')
        return res;
    }

} else {
    console.log('return err')
    return null;
}
}

async function getBase64() {
    return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function() {
          resolve(reader.result as string)
        }; 
        reader.onerror = function(error) {
            reject(error)
        };
        reader.readAsDataURL(file);
      });
}
