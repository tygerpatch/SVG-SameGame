function Tile(tile) {
   this.getPoint = Tile_getPoint;
   this.setPoint = Tile_setPoint;

   this.getColor = Tile_getColor;
   this.setColor = Tile_setColor;

   this.attachTo = Tile_attachTo;
   this.detachFrom = Tile_detachFrom;

   this.setXCoordinate = Tile_setXCoordinate;
   this.setYCoordinate = Tile_setYCoordinate;

   this.onClick = Tile_onClick;

   this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

   this.rect.setAttribute("stroke", Color.BLACK);
   this.rect.setAttribute("strokeWidth", "1");

   this.rect.setAttribute("width", 20);
   this.rect.setAttribute("height", 20);

   this.text = document.createElementNS("http://www.w3.org/2000/svg", "text");

   this.text.setAttribute("fill", Color.BLACK);
   this.text.setAttribute("fontSize", 15);
   this.text.setAttribute("fontFamily", "Arial");
   this.text.setAttribute("fontWeight", "bold");

   this.text.setAttribute("x", 5);
   this.text.setAttribute("y", 15);

   this.group = document.createElementNS("http://www.w3.org/2000/svg", "g");

   this.group.appendChild(this.rect);
   this.group.appendChild(this.text);

   this.x = Tile.SIZE;
   this.y = Tile.SIZE;

   //this.group.setAttribute("transform", "translate(20, 20)");
   this.group.setAttribute("transform", ['translate(', this.x, ', ', this.y, ')'].join(''));

   this.visible = false;
   this.isVisible = Tile_isVisible

   this.setRow = Tile_setRow;
   this.getRow = Tile_getRow;

   this.setColumn = Tile_setColumn;
   this.getColumn = Tile_getColumn;
}

function Tile_getPoint() {
   return this.point;
}

function Tile_attachTo(svg) {
   svg.appendChild(this.group);
   this.visible = true;
}

function Tile_detachFrom(svg) {
   svg.removeChild(this.group);
   this.visible = false;
}

function Tile_setXCoordinate(x) {
   this.x = x;
   this.group.setAttribute("transform", ["translate(", this.x, ", ", this.y, ")"].join(' '));
}

function Tile_setYCoordinate(y) {
   this.y = y;
   this.group.setAttribute("transform", ["translate(", this.x, ", ", this.y, ")"].join(' '));
}

Tile.SIZE = 20;

function Tile_onClick(func) {
   this.group.onclick = function(e) {
      func.call();
   }
}

function Tile_setPoint(point) {
   this.point = point;
   this.text.textContent = this.point;
}

function Tile_getPoint() {
   return this.point;
}

function Tile_setColor(color) {
   this.rect.setAttribute("fill", color);
}

function Tile_getColor() {
   return this.rect.getAttribute("fill");
}

function Tile_isVisible() {
   return this.visible;
}

function Tile_isChainedTo(tile) {
   return tile.isVisible() && (tile.getPoint() == this.point);
}

function Tile_getRow() {
   return this.row;
}

function Tile_setRow(row) {
   this.row = row;
}

function Tile_getColumn() {
   return this.column;
}

function Tile_setColumn(column) {
   this.column = column;
}
