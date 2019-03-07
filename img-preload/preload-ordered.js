function Preload (images, o) {
    this.currImg = null;
    this.procedure = 0;
    this.len = images.length;
    this.o = o;
    this.errorLog = [];
    this.init(images);
}

Preload.prototype.init = function (images) {
    var _this = this;
    var count = 0;
    images.forEach(function (imgSrc) {
        var img = new Image();
        img.src = imgSrc;
        img.onload = function () {
            count ++;
            _this.currImg = imgSrc;
            _this.procedure = parseInt((count / _this.len) * 100);
            if (_this.o.progress && typeof _this.o.progress === 'function') {
                _this.o.progress();
            }
            if (count === _this.len) {
                if (_this.o.finish && typeof _this.o.finish === 'function') {
                    _this.o.finish();
                }
            }
        }
        img.onerror = function () {
            var currError = new Error('cannot load img ' + _this.currImg);
            _this.errorLog.push(currError);
            _this.o.error(currError);
        }
    });
}
