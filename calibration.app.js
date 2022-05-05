function drawPoints(xpos, ypos) {
  g.drawLine(xpos, ypos - 5, xpos, ypos + 5);
  g.drawLine(xpos - 5, ypos, xpos + 5, ypos);
}

function main() {
  x = 16 + Math.floor(Math.random() * (g.getWidth() - 32));
  y = 40 + Math.floor(Math.random() * (g.getHeight() - 80));

  g.clearRect(0, 24, g.getWidth(), g.getHeight() - 24);
  g.setColor(0, 0, 1);
  g.drawString('current offset: ' + xoffset + ', ' + yoffset, 0, 24);

  if (calibration) {
    g.setColor(1, 0, 0);
    drawPoints(x, y);
  }
}

Bangle.on('touch', function(button, xy) {
  xoffset = Math.round((xoffset + (x - Math.floor((x + xy.x)/2)))/2);
  yoffset = Math.round((yoffset + (y - Math.floor((y + xy.y)/2)))/2);
  require('Storage').writeJSON('calibration.json', {
    xoffset: xoffset,
    yoffset: yoffset,
  });
  main();
});

let x, y;
let xoffset = 0, yoffset = 0;
let calibration = true;

E.srand(Date.now());
g.setFont('Vector', 10);
  require('Storage').writeJSON('calibration.json', {
    xoffset: 0,
    yoffset: 0,
  });
main();
