var cursor = document.getElementById('cursor');
var cursorX,
  cursorY;

  document.addEventListener("mousemove", function(e) {

    // cursorX = document.body.clientWidth - e.pageX;
    // cursorY = document.body.clientHeight - e.pageY;
    cursorX = e.pageX;
    cursorY = e.pageY;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    // console.log(cursorX, cursorY);
  })
