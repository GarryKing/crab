/**
 * Created by mao on 13-12-10.
 */
var totalheight = 0;
var toTop = 0;
var curr = 0;
var pageSize = 40;
var clientH = 0;
function loadData() {
    toTop = parseFloat(document.body.scrollTop);
    totalheight = parseFloat(document.body.scrollHeight);
    clientH = parseFloat(document.body.clientHeight);
    console.log("winH=" + totalheight  + " , toTop=" + toTop);
    if (totalheight - clientH <= toTop) {
        loadImages(curr, pageSize);
        curr = curr + pageSize;
    }
}
$(window).scroll(function () {
    loadData();
});
