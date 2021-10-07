# Asset Creator
This program creates icons in different sizes based on the image `input.png`.
The output can be found in the `output` directory.

## How To Install
You have to have npm and Node.js installed first.
Type `npm install` to install the program.

## How To Run
To run the program make sure that `input.png` exists and is the image you want it to be.
After that type `node ./app.js`.
You can type `node ./app.js dominant`, `node ./app.js dark` or `node ./app.js color #ff0000` for different background colors.

## Output
The following table shows the files the program generates.

| Path                                          | Description                                                   |
|-----------------------------------------------|---------------------------------------------------------------|
| `/output/apple-touch-icon.png`                | An icon for iOS devices                                       |
| `/output/favicon.ico`                         | A generic favicon                                             |
| `/output/preview.jpg`                         | A preview image for the Open Graph protocol and Twitter cards |
| `/output/pwa/logo.png`                        | An icon for PWA manifests                                     |
| `/output/pwa/mipmap-mdpi/ic_launcher.png`     | An icon for PWA manifests                                     |
| `/output/pwa/mipmap-hdpi/ic_launcher.png`     | An icon for PWA manifests                                     |
| `/output/pwa/mipmap-xhdpi/ic_launcher.png`    | An icon for PWA manifests                                     |
| `/output/pwa/mipmap-xxhdpi/ic_launcher.png`   | An icon for PWA manifests                                     |
| `/output/pwa/mipmap-xxxhdpi/ic_launcher.png`  | An icon for PWA manifests                                     |
| `/output/pwa/mipmap-xxxxhdpi/ic_launcher.png` | An icon for PWA manifests                                     |
