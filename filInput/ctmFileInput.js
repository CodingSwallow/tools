;(function ($) {
    $.fn.ctmFileInput = function (options) {
      var defaults = {
        //各种参数、各种属性
        buttonText: '上传文件', //button文字
        selectNoneText: '未选择任何文件', //未选择提示
        multiple: false,//是否多选
        tooltip: '',//悬停提示：例如：选择文件时按住ctrl键，可一次上传多个作品
        accept: '',//文件类型限制
        acceptcb: '',//文件类型不对调用的函数
        sizeLimit: -1,//文件大小限制，以M为单位
        sizeLimitcb: '',//文件超过限制调用的函数，例如，超过限制提示用户
        fileInputCb: '',//文件上传后调用的函数
      };
  
      //options合并到defaults上,defaults继承了options上的各种属性和方法,将所有的赋值给endOptions
      var endOptions = $.extend(defaults,options);
  
      this.each(function () {
        //实现功能的代码
        var _this = $(this);
        var buttonHtml = '<input class="ctmfile-button" type="button" value="'+ endOptions.buttonText + '">';
        var inputHtml = '<input class="ctmfile-input" type="file" name="file" style="display: none" accept="' + endOptions.accept + '"' + (endOptions.multiple ? ' multiple' : '') + '>';
        var textHtml = '<span class="ctmfile-text">' + endOptions.selectNoneText + '</span>';
        var tooltipHtml = endOptions.tooltip && endOptions.tooltip !== '' ? '<span class="ctmfile-tooltip" style="display:none">' + endOptions.tooltip + '</span>' : '';
        _this.html(buttonHtml + inputHtml + textHtml + tooltipHtml);

        _this.find('.ctmfile-button').on('click', function () {
            _this.find('.ctmfile-input').trigger('click');
        });
        _this.find('.ctmfile-input').on('change', function () {
            for (var i = 0; i < $(this)[0].files.length; i ++) {
                if (endOptions.accept.indexOf($(this)[0].files[i].type) === -1) {
                    if (typeof endOptions.acceptcb === 'function') {
                        endOptions.acceptcb();
                    }
                    return;
                }
            }
            if (endOptions.sizeLimit === -1) {
                for (var i = 0; i < $(this)[0].files.length; i ++) {
                    if (endOptions.accept.indexOf($(this)[0].files[i]) === -1) {
                        return false;
                    }
                }
                _this.find('.ctmfile-text').text($(this)[0].files.length > 1 ? $(this)[0].files.length + '个文件' : $(this)[0].files[0].name);
            } else {
                var sizeForAll = 0;
                for (var i = 0; i < $(this)[0].files.length; i ++) {
                    sizeForAll += $(this)[0].files[i].size;
                }
                if (sizeForAll >= endOptions.sizeLimit * 1024 * 1024) {
                    if (typeof endOptions.sizeLimitcb === 'function') {
                        endOptions.sizeLimitcb();
                    }
                    $(this).val('');
                    $(this).siblings('.ctmfile-text').val(endOptions.selectNoneText);
                } else {
                    _this.find('.ctmfile-text').text($(this)[0].files.length > 1 ? $(this)[0].files.length + '个文件' : $(this)[0].files[0].name);
                }
            }
            
            if (typeof endOptions.fileInputCb === 'function') {
                endOptions.fileInputCb();
            }
        });
        if (_this.find('.ctmfile-tooltip').length > 0) {
            _this.find('.ctmfile-button').on('mouseenter', function (event) {
                _this.find('.ctmfile-tooltip').css({
                    left: event.offsetX + 'px',
                }).show();
            }).on('mouseleave click', function () {
                $('.ctmfile-tooltip').hide();
            })
        }
      });
    };
})(jQuery);