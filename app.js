const sharp = require('sharp')

const files = [
  [48, '0.png'],
  [72, '1.png'],
  [96, '2.png'],
  [144, '3.png'],
  [192, '4.png'],
  [384, '5.png'],
  [512, '6.png']
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
    }]).toBuffer()

  files.forEach(item => {
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
      .toFile('output/' + item[1], (err, _) => {
        if (err) console.error(err.message)
        else console.log('Created image')
      })
  })
}

main()
