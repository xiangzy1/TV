import { exec } from "child_process";
import { readFileSync } from "fs"
import type { IFFProbeResponse } from "./interface";
// bun script
// curl -o /dev/null -s -w "Time_Connect: %{time_connect}s\nTime_StartTransfer: %{time_starttransfer}s\nTime_Total: %{time_total}s\n" "http://[2409:8087:7000:20::4]:80/dbiptv.sn.chinamobile.com/PLTV/88888888/224/3221226231/1.m3u8"



async function analyze(fileContent: string) {
  const ret: Record<string, any> = {}
  let curChannel = ''
  for (const line of fileContent.split("\n")) {
    if (line.startsWith('http')) {
      try {
        const res = await testStream(line)
        const videoInfo = res.streams[0]
        const audioInfo = res.streams[1]
        console.log(`${getName(curChannel)} ${res.time} ${videoInfo.width}x${videoInfo.height}`)
        if ((videoInfo.width ?? 0) > 1920) {
          await writeFileToLast('test.m3u', curChannel)
          await writeFileToLast('test.m3u', line)
          console.log({
            channelName: getName(curChannel),
            videoCodec: videoInfo.codec_name,
            width: videoInfo.width,
            height: videoInfo.height,
            frameRate: videoInfo.avg_frame_rate,
            audioCodec: audioInfo.codec_name,
            sampleRate: audioInfo.sample_rate,
            channels: audioInfo.channels,
            channelLayout: audioInfo.channel_layout
          })
        }
      } catch(e) {
        // console.log(e)
      }
    } else {
      curChannel = line
    }
  }
  console.log('finish', ret)
}

function getName(channel: string) {
  const list = channel.split(',')
  return list[list.length - 1]
}

function runCommand(cmd: string, timeout = 2000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("timeout")
    }, timeout)
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

async function testStream(url: string) {
  try {
    const timestamp = Date.now()
    const res = await runCommand(`ffprobe -v quiet -print_format json -show_format -show_streams "${url}"`, 3000) as string
    return {
      time: Date.now() - timestamp + 'ms',
      ...JSON.parse(res)
    }
  } catch(e) {}
  return {}
}

function writeFileToLast(path: string, content: string) {
  return runCommand(`echo "${content}" >> ${path}`)
}

// analyze(readFileSync("APTV.m3u", "utf8"))
analyze(readFileSync("libs/Meroser.m3u", "utf8"))
analyze(readFileSync("libs/aptv.m3u", "utf8"))
analyze(readFileSync("libs/joevess.m3u", "utf8"))
analyze(readFileSync("libs/yuechan.m3u", "utf8"))
