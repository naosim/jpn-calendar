# jpn-calendar
日本のカレンダー(JSON)
2024年のカレンダーは[こちら](https://naosim.github.io/jpn-calendar/dist/jpnCal_2024.json)

# カレンダーの生成方法
1. jpnCal.js内の祝日をメンテする
2. 次のコマンドで生成する。targetYearに西暦を入れること
```
node jpnCal.js [targetYear] > dist/jpnCal_[targetYear].json
```