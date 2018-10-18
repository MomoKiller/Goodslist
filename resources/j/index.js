/**
 * Created by pkk on 2018/10/14.
 */

$(function () {
    var _listGoods = {
        img: '',
        title: '',
        desc: '',
        price: '',
        area: '',
        areaPrice: ''
    };
    var _listIndex = 0;
    var goods = {
        init: function () {
            goods.listClick();
        },
        listClick: function () {
            var list = $('.goods_list li');
            list.bind('click', function () {
                var edThis = $(this);
                _listIndex = edThis.index();
                _listGoods.img = edThis.find('.img_wrap img').attr('src');
                _listGoods.title = edThis.find('.list_wrap a.title').text();
                _listGoods.desc = edThis.find('.list_wrap p.desc').text();
                _listGoods.price = edThis.find('.list_wrap a.price .current_price').text();
                _listGoods.area = edThis.find('.list_wrap a.price .area').text();
                _listGoods.areaPrice = edThis.find('.list_wrap a.price .area_price').text();
                if ($('.msg_box').css('display') == 'none') {
                    goods.msgBoxShow();
                } else {
                    goods.msgBoxHide();
                }
            });
        },
        //替换内容
        substitute: function (str, data) {
            if (data && typeof (data) == 'object') {
                return str.replace(/\{([^{}]+)\}/g, function (match, key) {
                    var value = data[key];
                    return (value !== undefined) ? '' + value : '';
                });
            } else {
                return str.toString();
            }
        },
        // 弹框模板
        msgTempl: '<li>' +
            '<div class="list_l">图片：</div>' +
            '<div class="list_r">' +
            '<div class="img_wrap">' +
            '<img src="{img}" class="img"/>' +
            '</div>' +
            '<input type="file" class="img_file"/>' +
            '</div>' +
            '</li>' +
            '<li>' +
            '<div class="list_l">商品名称：</div>' +
            '<div class="list_r">' +
            '<input value="{title}" class="title"/>' +
            '</div>' +
            '</li>' +
            '<li>' +
            '<div class="list_l">商品描述：</div>' +
            '<div class="list_r">' +
            '<textarea class="edesc">{desc}</textarea>' +
            '</div>' +
            '</li>' +
            '<li>' +
            '<div class="list_l">商品价格：</div>' +
            '<div class="list_r">' +
            '<input value="{price}" class="price"/>' +
            '</div>' +
            '</li>' +
            '<li>' +
            '<div class="list_l">地区：</div>' +
            '<div class="list_r">' +
            '<input value="{area}" class="area"/>' +
            '</div>' +
            '</li>' +
            '<li>' +
            '<div class="list_l">地区价格：</div>' +
            '<div class="list_r">' +
            '<input value="{areaPrice}" class="area_price"/>' +
            '</div>' +
            '</li>' +
            '<li>' +
            '<div class="btn_wrap">' +
            '<a class="submit">提交</a>' +
            '<a class="cancel">取消</a>' +
            '</div>' +
            '</li>',
        // 弹框事件
        msgBoxEvent: function () {
            var cancelBtn = $('.msg_box .btn_wrap .cancel');
            var submitBtn = $('.msg_box .btn_wrap .submit');
            // 取消操作
            cancelBtn.bind('click', function () {
                goods.msgBoxHide();
            });
            // 提交
            submitBtn.bind('click', function () {
                var editList = $('.msg_box .desc ul');
                _listGoods.img = editList.find('.img_wrap img').attr('src');
                _listGoods.title = editList.find('.title').val();
                _listGoods.desc = editList.find('.edesc').val();
                _listGoods.price = editList.find('.price').val();
                _listGoods.area = editList.find('.area').val();
                _listGoods.areaPrice = editList.find('.area_price').val();

                var subList = $('.goods_list li').eq(_listIndex);
                subList.find('.img_wrap img').attr('src', _listGoods.img);
                subList.find('.list_wrap a.title').text(_listGoods.title);
                subList.find('.list_wrap p.desc').text(_listGoods.desc);
                subList.find('.list_wrap .price .current_price').text(_listGoods.price);
                subList.find('.list_wrap .price .area').text(_listGoods.area);
                subList.find('.list_wrap .price .area_price').text(_listGoods.areaPrice);

                goods.msgBoxHide();
            });
        },
        // 图片显示
        imgSubstitude: function () {
            var img = $('.msg_box .img_file');
            img.change(function () {
                var file = this.files[0];
                var url = getObjectURL(file);
                $('.msg_box .img_wrap img').attr('src', url);
            });
        },
        // 打开弹框
        msgBoxShow: function () {
            // var scrollT  = document.body.scrollTop|| document.documentElement.scrollTop;
            $('.msg_box').css({'display':'block'});
            $('body').css('overflow', 'hidden');
            $('.msg_box .desc ul').html(goods.substitute(goods.msgTempl, _listGoods));
            goods.msgBoxEvent();
            goods.imgSubstitude();
        },
        // 关闭弹框
        msgBoxHide: function () {
            $('.msg_box').css('display', 'none');
            $('body').css('overflow', 'auto');
        }
    };
    goods.init();
});