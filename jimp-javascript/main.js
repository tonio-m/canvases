let jimp = require('jimp')

async function main() {
  const image = await jimp.read('download.jpeg');
  const map = await jimp.read('noiseTexture.png');

  let a = image.displace(map, 10);
  a.write('a.jpeg')
}

main();
