//图片预加载
(function($){
    function preLoad(imgs,options){
        this.imgs = (typeof imgs === 'string') ? [imgs] : imgs; //判断imgs是不是字符串
        this.opts = $.extend({},preLoad.DEFAULTS,options);  //用options覆盖默认值

        // this._unordered();
        if(this.opts.order === 'ordered'){
            this._ordered();
        }else{
            this._unordered();
        }
    }
    preLoad.DEFAULTS = {
        order:'unordered',  //默认情况下无序加载
        each: null, //每一张图片加载完毕执行
        all: null //所有图片加载完毕执行
    };

    preLoad.prototype._ordered = function(){  //有序加载
        var imgs = this.imgs,opts = this.opts,count=0,len=imgs.length;
        load();
        function load(){
            var imgObj = new Image();
            $(imgObj).on('load error',function(){
                opts.each && opts.each(count);  //判断opts是否存在

                if(count>=len){  //所有图片加载完成
                    opts.all && opts.all();
                }else{
                    load();
                }
                count++;
            });

            imgObj.src= imgs[count];
        }
    },
    preLoad.prototype._unordered = function(){  //无序加载
        var imgs = this.imgs,opts = this.opts,count=0,len=imgs.length;

        //图片加载遍历
        $.each(imgs,function(i,src){   //遍历imgs
            if(typeof src!='string') return;

            var imgObj = new Image();

            $(imgObj).on('load error',function(){   //load事件
                opts.each && opts.each(count);  //判断opts是否存在

                if(count>=len-1){
                    opts.all && opts.all();
                }

                count++;
            });
            imgObj.src=src;
        });
    }

    
    $.extend({
        preLoad : function(imgs,opts){
            new preLoad(imgs,opts);
        }
    })
	

    
})(jQuery);
