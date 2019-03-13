/**
 * -----option-----
 * container: canvas容器的ID，必须
 * width, height: canvas的高度和宽度
 * lines: 数组，存储每条线条的样式，包括线条宽度和颜色和透明度;（优先级比length和color高）
 * lines:[{color: '#fff', lineWidth: 1, globalAplpha: 1}]
 * length：线条的数量，默认1
 * speed：波运动的速度，默认0.1
 * amplitude：波的振幅，最大的振幅(占据一半高度的百分比)，默认0.5
 * halfWaveCount：半波的个数，默认3
 * color: 波的颜色，默认#000黑色
 * lineWidth: 线条宽度，默认1
 * globalAlpha：线条透明度，默认1
 * dir：方向，l(向左), r(向右)，默认r
 * 
 * -----method-----
 * .init() 初始化&重置reset
 * .start() 波开始运动
 * .stop() 停止波的运动
 */
function Wave(option) {
    if (!option || typeof option !== 'object' || !option.container) return;
    /* canvas & context */
    var canvas = document.getElementById(option.container);
    var ctx = canvas.getContext('2d');

    /* 声明需要的参数 */
    var canvasWidth,canvasHeight;
    var lines_count, 
        lines,
        max_amplitude_percent,
        amplitude_percent,
        temp_max_amplitude_percent,
        speed,
        half_wave_count,
        angular_frequency,
        relative_offset,
        y_offset,
        waveColor,
        waveLineWidth,
        waveAlpha,
        waveAnim;

    /**
     * 初始化
     */
    this.init = function () {
        cancelAnimationFrame(waveAnim);
        initParams();
        loop();
    }

    /**
     * 动画开始
     */
    this.start = function () {
        cancelAnimationFrame(waveAnim);
        requestAnimationFrame(loop);
    }

    /**
     * 动画停止
     */
    this.stop = function () {
        cancelAnimationFrame(waveAnim);
    }

    /**
     * 初始化参数的值
     */
    function initParams () {
        // canvas的参数的初始化
        canvasWidth = option.width ? option.width : canvas.width;
        canvasHeight = option.height ? option.height : canvas.height;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#000';
        lines = option.lines && option.lines.length > 0 ? option.lines : null;

        // 波的参数的初始化
        lines_count = option.length ? option.length : 1;
        max_amplitude_percent = option.amplitude ? option.amplitude : 0.5;
        amplitude_percent = max_amplitude_percent;
        temp_max_amplitude_percent = max_amplitude_percent;
        speed = option.speed ? option.speed : 0.1;
        half_wave_count = option.halfWaveCount ? option.halfWaveCount : 3;
        angular_frequency = Math.PI * half_wave_count / canvasWidth;
        relative_offset = 0;
        y_offset = canvasHeight / 2;
        waveColor = option.color ? option.color : '#000';
        waveLineWidth = option.lineWidth ? option.lineWidth : 1;
        waveAlpha = option.globalAlpha ? option.globalAlpha : 1;
        waveAnim = null;
    }

    /**
     * 波的循环运动
     */
    function loop () {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        max_amplitude_percent = temp_max_amplitude_percent;

        if (lines && lines.length > 0) {
            var per_ampl = max_amplitude_percent / lines.length;
            for (var i = 0; i < lines.length; i ++) {
                ctx.globalAlpha = lines[i].globalAlpha ? lines[i].globalAlpha : 1;
                ctx.lineWidth = lines[i].lineWidth ? lines[i].lineWidth : 1;
                ctx.strokeStyle = lines[i].color ? lines[i].color : '#000';
                drawSin();
                
                max_amplitude_percent -= per_ampl;
            }
        } else {
            var per_ampl = max_amplitude_percent / lines_count;
            var per_alpha = waveAlpha / lines_count;
            ctx.strokeStyle = waveColor;
            ctx.lineWidth = waveLineWidth;
            for (var i = 0; i < lines_count; i ++) {
                ctx.globalAlpha = waveAlpha - per_alpha * i;
                drawSin();
                max_amplitude_percent -= per_ampl;
            }
        }
        // 判断运动方向
        if (option.dir && option.dir === 'l') {
            relative_offset += speed;
        } else {
            relative_offset -= speed;
        }
        // 波运动的循环
        waveAnim = requestAnimationFrame(loop);
    }

    /**
     * 一条两端衰减的曲线的绘制
     */
    function drawSin() {
        ctx.beginPath();
        ctx.moveTo(0, canvasHeight/2);
        for (var x = 1; x <= canvasWidth; x += speed) {
            amplitude_percent = getAmplitudePercent(x, max_amplitude_percent, canvasWidth/2);
            amplitude = - canvasHeight * amplitude_percent;
            ctx.lineTo(x, sin(x));
        }
        ctx.stroke();
    }

    /**
     * 衰减函数
     * x：水平坐标
     * max：波振幅最大值，即未衰减的振幅
     * halfwidth：canvas宽度的一半
     */
    function getAmplitudePercent(x, max, halfwidth) {
        return (2 * max * x) / halfwidth - (max * x * x) / (halfwidth * halfwidth);
    }
    
    /**
     * 根据canvas里面水平方向坐标获取垂直方向坐标
     */
    function sin(x) {
        return amplitude * Math.sin(angular_frequency * x + relative_offset) + y_offset;
    }

}
