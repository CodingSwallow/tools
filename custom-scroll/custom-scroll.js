function customScroll () {
    if (document.getElementsByClassName('scroll-out-h').length > 0) {
        scrollHorizontal();
    }
    if (document.getElementsByClassName('scroll-out-v').length > 0) {
        scrollVertical();
    }
    if (document.getElementsByClassName('scroll-out').length > 0) {
        scrollAll();
    }
}

function scrollHorizontal () {
    var scrollOuts = document.getElementsByClassName('scroll-out-h');
    for (var i = 0; i < scrollOuts.length; i ++) {
        (function (i) {
            var scrollOut = scrollOuts[i];
            var scrollIn = scrollOut.getElementsByClassName('scroll-in')[0];
            var dragCon = scrollOut.getElementsByClassName('drag-con')[0];
            var dragBox = scrollOut.getElementsByClassName('drag-box')[0];
            
            horizontalScrollListener(scrollOut, scrollIn, dragCon, dragBox);
        })(i);
    }
}

function scrollVertical () {
    var scrollOuts = document.getElementsByClassName('scroll-out-v');
    for (var i = 0; i < scrollOuts.length; i ++) {
        (function (i) {
            var scrollOut = scrollOuts[i];
            var scrollIn = scrollOut.getElementsByClassName('scroll-in')[0];
            var dragCon = scrollOut.getElementsByClassName('drag-con')[0];
            var dragBox = scrollOut.getElementsByClassName('drag-box')[0];
            
            verticalScrollListener(scrollOut, scrollIn, dragCon, dragBox);
        })(i);
    }
}

function scrollAll () {
    var scrollOuts = document.getElementsByClassName('scroll-out');
    for (var i = 0; i < scrollOuts.length; i ++) {
        (function (i) {
            var scrollOut = scrollOuts[i];
            var scrollIn = scrollOut.getElementsByClassName('scroll-in')[0];
            var dragConH = scrollOut.getElementsByClassName('drag-con-h')[0];
            var dragBoxH = scrollOut.getElementsByClassName('drag-box-h')[0];
            var dragConV = scrollOut.getElementsByClassName('drag-con-v')[0];
            var dragBoxV = scrollOut.getElementsByClassName('drag-box-v')[0];
            
            horizontalScrollListener(scrollOut, scrollIn, dragConH, dragBoxH);

            verticalScrollListener(scrollOut, scrollIn, dragConV, dragBoxV)
        })(i);
    }
}

function verticalScrollListener (scrollOut, scrollIn, dragCon, dragBox) {
    dragBox.onmousedown = function (ev){
        var e = ev || window.event;
        if (e.preventDefault) {
            e.preventDefault();
        } else{
            e.returnValue = false;
        };
        var dis_dragboxtop_mousepoint = e.clientY - dragBox.offsetTop;
        document.onmousemove = function (ev){
            var e = ev || window.event;
            var top = e.clientY - dis_dragboxtop_mousepoint;
            if (top <= 0) {
                top = 0;
            };
            if (top >= dragCon.clientHeight - dragBox.clientHeight) {
                top = dragCon.clientHeight - dragBox.clientHeight;
            };
            var scale = top / (dragCon.clientHeight - dragBox.clientHeight);
            var conTop = scale * (scrollIn.clientHeight - scrollOut.clientHeight);
            dragBox.style.top = top + 'px';
            scrollIn.style.top = -conTop + 'px';
        }
        document.onmouseup = function (){
            document.onmousemove = null;
        }
    }

    if (window.navigator.userAgent.toLowerCase().indexOf('firefox') !== -1) {
        scrollOut.addEventListener('DOMMouseScroll',function (e){
            e.preventDefault();
            if (e.detail < 0) {
                var conTop = scrollIn.offsetTop + 20;
                if (conTop >= 0) {
                    conTop = 0;
                }
                if (conTop <= - (scrollIn.clientHeight - scrollOut.clientHeight)) {
                    conTop = - (scrollIn.clientHeight - scrollOut.clientHeight);
                }
                var scale = conTop/(scrollIn.clientHeight - scrollOut.clientHeight);
                var top = scale * (dragCon.clientHeight - dragBox.clientHeight);
                scrollIn.style.top = conTop + 'px';
                dragBox.style.top = -top + 'px';
            } else {
                var conTop = scrollIn.offsetTop - 20;
                if (conTop >= 0) {
                    conTop = 0;
                }
                if (conTop <= - (scrollIn.clientHeight - scrollOut.clientHeight)) {
                    conTop = - (scrollIn.clientHeight - scrollOut.clientHeight);
                }
                var scale = conTop/(scrollIn.clientHeight - scrollOut.clientHeight);
                var top = scale * (dragCon.clientHeight - dragBox.clientHeight);
                scrollIn.style.top = conTop + 'px';
                dragBox.style.top = -top + 'px';
            }
        })
    } else {
        scrollOut.onmousewheel = function (ev) {
            var e = ev || window.event;
            if (e.preventDefault) {
                e.preventDefault();
            } else{
                e.returnValue = false;
            };
            if (e.wheelDelta > 0) {
                var conTop = scrollIn.offsetTop + 20;
                if (conTop >= 0) {
                    conTop = 0;
                }
                if (conTop <= - (scrollIn.clientHeight - scrollOut.clientHeight)) {
                    conTop = - (scrollIn.clientHeight - scrollOut.clientHeight);
                }
                var scale = conTop/(scrollIn.clientHeight - scrollOut.clientHeight);
                var top = scale * (dragCon.clientHeight - dragBox.clientHeight);
                scrollIn.style.top = conTop + 'px';
                dragBox.style.top = -top + 'px';
            } else {
                var conTop = scrollIn.offsetTop - 20;
                if (conTop >= 0) {
                    conTop = 0;
                }
                if (conTop <= - (scrollIn.clientHeight - scrollOut.clientHeight)) {
                    conTop = - (scrollIn.clientHeight - scrollOut.clientHeight);
                }
                var scale = conTop/(scrollIn.clientHeight - scrollOut.clientHeight);
                var top = scale * (dragCon.clientHeight - dragBox.clientHeight);
                scrollIn.style.top = conTop + 'px';
                dragBox.style.top = -top + 'px';
            }
        }
    }
}

function horizontalScrollListener (scrollOut, scrollIn, dragCon, dragBox) {
    dragBox.onmousedown = function (ev){
        var e = ev || window.event;
        if (e.preventDefault) {
            e.preventDefault();
        } else{
            e.returnValue = false;
        };
        var dis_dragboxtop_mousepoint = e.clientX - dragBox.offsetLeft;
        document.onmousemove = function (ev){
            var e = ev || window.event;
            var left = e.clientX - dis_dragboxtop_mousepoint;
            if (left <= 0) {
                left = 0;
            };
            if (left >= dragCon.clientWidth - dragBox.clientWidth) {
                left = dragCon.clientWidth - dragBox.clientWidth;
            };
            var scale = left / (dragCon.clientWidth - dragBox.clientWidth);
            var conLeft = scale * (scrollIn.clientWidth - scrollOut.clientWidth);
            dragBox.style.left = left + 'px';
            scrollIn.style.left = -conLeft + 'px';
        }
        document.onmouseup = function (){
            document.onmousemove = null;
        }
    }
}