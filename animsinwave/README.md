## 例子
``` html
<script src="wave.js"></script>
<body>
    <canvas id="sin"></canvas>
    
    <button id="reset">reset</button>
    <button id="start">start</button>
    <button id="stop">stop</button>
</body>
```
``` javascript
var wave = new Wave({
            container: 'sin',
            width: 300,
            height: 100,
            length: 15,
            speed: 0.1,
            amplitude: 0.2,
            halfWaveCount: 3,
            color: '#8b59e6',
            lineWidth: 1,
            globalAlpha: 1,
            lines: [
                {color: '#8b59e6', lineWidth: 1, globalAlpha: 1},
                {color: '#e65992', lineWidth: 0.8, globalAlpha: 1},
                {color: '#5ed992', lineWidth: 0.6, globalAlpha: 1},
                {color: '#eae449', lineWidth: 0.4, globalAlpha: 1},
            ],
        })

    wave.init();

    document.getElementById('start').addEventListener('click', function () {
        wave.start();
    })
    document.getElementById('stop').addEventListener('click', function () {
        wave.stop();
    })
    document.getElementById('reset').addEventListener('click', function () {
        wave.init();
    })
```