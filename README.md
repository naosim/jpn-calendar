# jpn-calendar
日本のカレンダーデータです。  
独自のカレンダーアプリを作る際に、本データを使うとjs標準のDate型から作るより楽です。  

## 特徴
- 週は月曜始まり
- 祝日のデータが入っている  
- 週数が入っている

## 出力
2024年のカレンダーはこちら
- json: https://naosim.github.io/jpn-calendar/dist/jpnCal2024.json
- js: https://naosim.github.io/jpn-calendar/dist/jpnCal2024.js
- mjs: https://naosim.github.io/jpn-calendar/dist/jpnCal2024.mjs

## 本データを読み込んだサンプル
[こちら](https://naosim.github.io/jpn-calendar/sample.html)

## カレンダーの生成方法
1. jpnCal.js内の祝日をメンテする
2. 次のコマンドで生成する。targetYearに西暦を入れること
```
node jpnCal.mjs [targetYear]
```