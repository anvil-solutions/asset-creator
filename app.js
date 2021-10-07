const fs = require('fs'), sharp = require('sharp'), toIco = require('to-ico')

const ICON_MAX_SIZE = 1024
const APPLE_TOUCH_ICON_SIZE = 180

const files = [
  [48, 'mipmap-mdpi/', 'ic_launcher.png'],
  [72, 'mipmap-hdpi/','ic_launcher.png'],
  [96, 'mipmap-xhdpi/','ic_launcher.png'],
  [144, 'mipmap-xxhdpi/','ic_launcher.png'],
  [192, 'mipmap-xxxhdpi/','ic_launcher.png'],
  [384, 'mipmap-xxxxhdpi/','ic_launcher.png'],
  [512, '','logo.png'],
  [256, 'temp/','256.png']
]

if (!fs.existsSync('input.png')) {
  console.log('Please make sure a file named "input.png" exists in this directory')
  process.exit(1)
}

let innerSize = 0
let margin = 0

function delay(t) {
  return new Promise(resolve => {
     setTimeout(resolve, t)
  })
}

async function main() {
  if (!fs.existsSync('./output/')) fs.mkdirSync('./output/')
  if (!fs.existsSync('./output/pwa/')) fs.mkdirSync('./output/pwa/')
  if (!fs.existsSync('./output/pwa/temp')) fs.mkdirSync('./output/pwa/temp')

  let backgroundColor = '#fff'
  if (process.argv[2] === 'dominant') backgroundColor = (await sharp('input.png').stats()).dominant
  else if (process.argv[2] === 'dark') backgroundColor = '#121212'
  else if (process.argv[2] === 'color' && process.argv[3] != null) backgroundColor = process.argv[3]

  // Preview
  sharp('input.png')
    .resize(256, 256, {
        fit: sharp.fit.contain,
        background: backgroundColor
    })
    .flatten({ background: backgroundColor })
    .extend({
      top: 187,
      bottom: 187,
      left: 472,
      right: 472,
      background: backgroundColor
    })
    .jpeg({
      quality: 60
    })
    .toFile('./output/preview.jpg', (err, _) => {
      if (err) console.error(err.message)
      else console.log('Created jpg image: 1200 x 630')
    })

  // Apple touch icon
  sharp('input.png')
    .resize(APPLE_TOUCH_ICON_SIZE, APPLE_TOUCH_ICON_SIZE, {
        fit: sharp.fit.contain,
        background: backgroundColor
    })
    .flatten({ background: backgroundColor })
    .png()
    .toFile('./output/apple-touch-icon.png', (err, _) => {
      if (err) console.error(err.message)
      else console.log('Created png image: ' + APPLE_TOUCH_ICON_SIZE)
    })

  // PWA icons
  innerSize = Math.round(ICON_MAX_SIZE * .92 / 2) * 2
  margin = (ICON_MAX_SIZE - innerSize) / 2

  const r = innerSize / 2
  const circleShape = Buffer.from(`<svg><circle cx="${r}" cy="${r}" r="${r}" /></svg>`)
  const baseImage = await sharp('input.png')
    .resize(innerSize, innerSize, {
        fit: sharp.fit.contain,
        background: backgroundColor
    })
    .flatten({ background: backgroundColor })
    .composite([{
      input: circleShape,
      blend: 'dest-in'
    }])
    .extend({
      top: margin,
      bottom: margin,
      left: margin,
      right: margin,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toBuffer()

  for (item of files) {
    if (!fs.existsSync('./output/pwa/' + item[1])) fs.mkdirSync('./output/pwa/' + item[1])
    await sharp(baseImage)
      .resize(item[0], item[0])
      .png()
      .toFile('./output/pwa/' + item[1] + item[2], (err, info) => {
        if (err) console.error(err.message)
        else console.log('Created png image: ' + info.width)
      })
  }

  // Favicon
  while (!fs.existsSync('./output/pwa/temp/256.png')) await delay(100)
  toIco([fs.readFileSync('./output/pwa/temp/256.png')]).then(buf => {
    fs.writeFileSync('./output/favicon.ico', buf)
    console.log('Created ico image: 256')
  }).catch(error => {
    console.error(error)
  });
  fs.rmdirSync('./output/pwa/temp', { recursive: true })
}

main()
