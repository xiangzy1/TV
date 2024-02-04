curl -s https://mirror.ghproxy.com/https://raw.githubusercontent.com/joevess/IPTV/main/sources/iptv_sources.m3u8 -o libs/joevess.m3u
curl -s https://raw.githubusercontent.com/Meroser/IPTV/main/IPTV.m3u -o libs/Meroser.m3u
curl -s https://raw.githubusercontent.com/Kimentanm/aptv/master/m3u/iptv.m3u -o libs/aptv.m3u
curl -s https://raw.githubusercontent.com/YueChan/Live/main/IPTV.m3u -o libs/yuechan.m3u
curl -s https://cdn.jsdelivr.net/gh/BurningC4/Chinese-IPTV@master/TV-IPV4.m3u -o libs/BurningC4.m3u

curl -o /dev/null -s -w "Time_Connect: %{time_connect}s\nTime_StartTransfer: %{time_starttransfer}s\nTime_Total: %{time_total}s\n" "http://39.134.24.161/dbiptv.sn.chinamobile.com/PLTV/88888890/224/3221226191/index.m3u8"
