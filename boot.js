Bangle.on('touch', function(button, xy) {
  let settings = require('Storage').readJSON("calibration.json", true) || {xoffset: 0, yoffset: 0,};
  xy.x += settings.xoffset;
  xy.y += settings.yoffset;
});