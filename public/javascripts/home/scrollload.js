/**
 * Created by mao on 13-12-10.
 */
var totalheight = 0;
var toTop = 0;
var curr = 0;
var pageSize = 20;
function loadData() {
    toTop = parseFloat($(window).scrollTop());
    totalheight = parseFloat($(window).height()) + toTop;
    console.log("winH=" + $(document).height() * 0.8 + " , toTop=" + toTop);
    if ($(document).height() * 0.8 <= toTop) {
        loadImages(curr, pageSize)
        curr = curr + pageSize
    }
}
$(window).scroll(function () {
    loadData();
});
