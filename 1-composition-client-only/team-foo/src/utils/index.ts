/**
 * @description 加载 images/ 目录下的图片名为 url
 * @param imageName images/ 目录下的图片名
 */
function loadImage(imageName: string) {
  const imagePath = `../images/${imageName}`
  const url = new URL(imagePath, import.meta.url).href

  return url
}

export { loadImage }
