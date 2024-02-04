import { exec } from "child_process";
import { readFileSync } from "fs"
// bun script

// read a file
const content = readFileSync("APTV.m3u", "utf8");

let curChannel = ''

async function analyze() {
  const ret: Record<string, any> = {}
  for (const line of content.split("\n")) {
    if (line.startsWith('http')) {
      try {
        const res = await runCommand(`curl -o /dev/null -s -w "%{time_total}" "${line}"`) as string
        ret[getName(curChannel)] = parseFloat(res) * 1000 | 0
      } catch(e) {
        // console.log(e)
      }
    } else {
      curChannel = line
    }
  }
  console.log(ret)
}

function getName(channel: string) {
  const list = channel.split(',')
  return list[list.length - 1]
}

function runCommand(cmd: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("timeout")
    }, 1000)
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      if (stderr) {
        reject(stderr);
        return;
      }
      resolve(stdout);
    })
  })
}

analyze()
