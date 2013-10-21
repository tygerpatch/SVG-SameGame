function Position(row, column) {
   this.row = row;
   this.column = column;

   this.getRow = Position_getRow;
   this.getColumn = Position_getColumn;
}

function Position_getRow() {
   return this.row;
}

function Position_getColumn() {
   return this.column;
}
