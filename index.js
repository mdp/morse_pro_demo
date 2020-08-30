const MorseCWWave = require("morse-pro/lib/morse-pro-cw-wave").default
const riffwave = require("morse-pro/lib/morse-pro-util-riffwave").getData

const fs = require("fs")
const { promisify } = require("util");

const writeFile = promisify(fs.writeFile);

async function main(content, out, wpm, farnsworth) {
  const morseCWWave = new MorseCWWave(true, wpm, farnsworth)
  const outFileWav = `${out}.wav`
  morseCWWave.translate(content)
  await writeFile(outFileWav,
    Buffer.from(riffwave(morseCWWave.getSample()))
  )
  console.log(`Written ${outFileWav}`)
}

main("cq cq cq de kc4t kc4t kc4t <AR>k", "cq", 25, 20).then(() => {
  console.log("Complete")
}).catch((e) => console.log(e))