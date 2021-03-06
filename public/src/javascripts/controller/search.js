define([
    "jquery",
    "underscore",
    "backbone",
    "view/search",
    "jqueryUI"
], function($, _, Backbone, ViewSearch) {
    return function(){
        $.widget( "custom.autocomplete", $.ui.autocomplete, {
            _renderItem: function( ul, item){
                //console.log(item)
                return $("<li>").append('<a class="search-item-a"><span class="search-item-head"><img src="'+item.head+'" width="25" height="25"/></span><span class="search-item-name">' + item.fullname+'('+item.name+')</span></a>').appendTo(ul);
            },
            _renderMenu: function( ul, items){
                var that = this;
                $.each(items, function(index, item){
                    that._renderItemData(ul, item);
                });
                //return $("li").append('<a class="search-item-a"><span class="search-item-head"><img src="'+item.head+'" width="25" height="25"/></span><span class="search-item-name">' + item.fullname+'('+item.name+')</span>').appendTo(ul);
            }
        });
        //搜索自动完成
        $("#search-input").autocomplete({
            source: function(request, response) {
                $.ajax({
                    url: "/api/getUsers",
                    dataType: "jsonp",
                    data: {
                        keyword: request.term
                    },
                    success: function(data) {
                        response(data.list);
                    }
                });
            },
            minLength: 3,
            focus: function(event, ui) {
                $("#search-input").val(ui.item.name);
                return false;
            },
            select: function(event, ui) {
                $("#search-input").val(ui.item.name);
                //return false;
            }
        });
    }
})