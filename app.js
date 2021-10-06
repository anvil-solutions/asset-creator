const sharp = require('sharp'), fs = require('fs')

const files = [
  [48, 'mipmap-mdpi/', 'ic_launcher.png'],
  [72, 'mipmap-hdpi/','ic_launcher.png'],
  [96, 'mipmap-xhdpi/','ic_launcher.png'],
  [144, 'mipmap-xxhdpi/','ic_launcher.png'],
  [192, 'mipmap-xxxhdpi/','ic_launcher.png'],
  [384, 'mipmap-xxxxhdpi/','ic_launcher.png'],
  [512, '','logo.png']
]

const width = 1024
const r = width / 2
const circleShape = Buffer.from(`<svg><circle cx="${r}" cy="${r}" r="${r}" /></svg>`)

async function main() {
  const baseImage = await sharp('input.png')
    .resize(width, width, {
        fit: sharp.fit.contain,
        background: '#fff'
    })
    .flatten({ background: '#fff' })
    .composite([{
      input: circleShape,
      blend: 'dest-in'
    }])
    .toBuffer()

  if (!fs.existsSync('./output/')) fs.mkdirSync('./output/')

  files.forEach(item => {
    if (!fs.existsSync('./output/' + item[1])) fs.mkdirSync('./output/' + item[1])

    const innerSize = Math.round(item[0] * .92 / 2) * 2
    const margin = (item[0] - innerSize) / 2
    sharp(baseImage)
      .resize(innerSize, innerSize)
      .extend({
        top: margin,
        bottom: margin,
        left: margin,
        right: margin,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile('./output/' + item[1] + item[2], (err, _) => {
        if (err) console.error(err.message)
        else console.log('Created image')
      })
  })
}

main()
