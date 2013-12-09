$(function () {
    initGlobalParameter();
    initBaseContent();
    loadImages();
    $(window).resize(function () {
        reSortImages();
    })
});

function initGlobalParameter() {
    clientVisibleWidth = document.body.clientWidth;
    clientVisibleHeight = document.body.clientHeight;
    imageDivWidth = 234;
    imageDivMargin = 8;
    imageDivPadding = 10;
    imageDivContentWidth = imageDivWidth - imageDivPadding * 2;
    columnNumber = Math.floor(clientVisibleWidth / (imageDivWidth + imageDivMargin * 2));
    imageCacheSize = 0;
}

function initBaseContent() {
    var content = $("#content_images");
    for (var i = 0; i < columnNumber; i++) {
        content.append("<ul id='image_ul_" + i + "' class='image_ul'></ul>");
    }
    content.css("width", (imageDivWidth + imageDivMargin * 2) * columnNumber)
        .css("margin", "0 auto");
    $(".image_ul").css("width", imageDivWidth)
        .css("margin", "0px " + imageDivMargin).css("padding", 0);
}

function loadImages() {
    $.ajax({
        url: "api/home/loadPictures.crab",
        dataType: "json",
        success: function (data) {
            createCacheNewIframe();
            imageCacheSize = data.length;
            for (var i = 0; i < data.length; i++) {
                createImageDiv(data[i]);
            }
        },
        error: function () {

        }
    });

    function createCacheNewIframe() {
        $("body").append("<iframe id='image_cache_iframe' style='display:none;'></iframe>");
    }

    function createImageDiv(data) {
        window.sc = "<img src=" + data.sourceUrl + "?" + Math.random() + ">";
        var content = "<div><li><div class='image_wrapper image_" + data.picId + "' style='display:;'></div></li></div>";
        var frame = document.getElementById("image_cache_iframe");
        var frameBody = $(frame).contents().find("body");
        frameBody.append(content);
        frameBody.find(".image_" + data.picId).append(window.sc);
        var img = frame.contentDocument.getElementsByClassName("image_" + data.picId)[0].getElementsByTagName("img")[0];
        $(img).width(imageDivWidth - 2 * imageDivPadding);
        img.onload = function () {
            $(img).parent().css("height", $(img).height());
            var copy = $(img).parent().parent().parent().html();
            $("#image_ul_" + getShortestList()).append(copy);
            imageCacheSize--;
            if (imageCacheSize == 0) {
                $("#image_cache_iframe").remove();
            }

        }
    }
}

function getShortestList() {
    var shortestId = Math.floor(columnNumber * Math.random());
    var shortestHeight = $("#image_ul_" + shortestId).height(), tempHeight = 0;
    for (var i = 0; i < columnNumber; i++) {
        tempHeight = $("#image_ul_" + i).height();
        if (tempHeight <= shortestHeight) {
            shortestHeight = tempHeight;
            shortestId = i;
        }
    }
    return shortestId;
}

function reSortImages() {
    initGlobalParameter();
    //alert(1);
}