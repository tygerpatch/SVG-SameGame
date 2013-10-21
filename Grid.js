function Grid() {
   // *** initialize grid
   var tile, func;
   this.grid = new Array(Grid.NUM_ROWS);

   for(var row = 0; row < Grid.NUM_ROWS; row++) {
      this.grid[row] = new Array(Grid.NUM_COLUMNS);

      for(var column = 0; column < Grid.NUM_COLUMNS; column++) {
         tile = new Tile();
         this.grid[row][column] = tile;

         tile.setXCoordinate(column * Tile.SIZE);
         tile.setYCoordinate(row * Tile.SIZE);

         tile.setRow(row);
         tile.setColumn(column);

         func = new Function("updateScore(" + row + ", " + column + ")");
         tile.onClick(func);
      }
   }

   // **** methods

   this.generate = Grid_generate;
   this.compress = Grid_compress;
   this.attachTo = Grid_attachTo;
   this.getTile = Grid_getTile;
}

Grid.NUM_ROWS = 10;
Grid.NUM_COLUMNS = 20;

function Grid_generate() {
   var colors = [Color.NONE, Color.RED, Color.GREEN, Color.BLUE, Color.YELLOW, Color.ORANGE];
   var tile, point, color;

   for(var row = 0; row < Grid.NUM_ROWS; row++) {
      for(var column = 0; column < Grid.NUM_COLUMNS; column++) {
         tile = this.grid[row][column];

         // random number between 1 and 5
         point = Math.floor((Math.random() * 5) + 1);
         tile.setPoint(point);

         color = colors[point];
         tile.setColor(color);
      }
   }
}

function Grid_attachTo(svg) {
   for(var row = 0; row < Grid.NUM_ROWS; row++) {
      for(var column = 0; column < Grid.NUM_COLUMNS; column++) {
         this.grid[row][column].attachTo(svg);
      }
   }
}

function Grid_compress(svg) {
   var point, color, r, c, tile;

   // compress rows
   for(var column = 0; column < Grid.NUM_COLUMNS; column++) {
      for(var row = Grid.NUM_ROWS - 1; row >= 0; row--) {
         if(!this.grid[row][column].isVisible()) {
            r = row - 1;

            while(r >= 0) {
               if(this.grid[r][column].isVisible()) {
                  point = this.grid[r][column].getPoint();
                  this.grid[row][column].setPoint(point);

                  color = this.grid[r][column].getColor();
                  this.grid[row][column].setColor(color);

                  this.grid[r][column].detachFrom(svg);
                  this.grid[row][column].attachTo(svg);

                  r = 0;
               }

               r--;
            }
         }
      }
   }

   // compress columns
   for(var column = 0; column < Grid.NUM_COLUMNS; column++) {
      if(!this.grid[Grid.NUM_ROWS - 1][column].isVisible()) {
         c = column + 1;

         while(c < Grid.NUM_COLUMNS) {
            if(this.grid[Grid.NUM_ROWS - 1][c].isVisible()) {
               for(var row = 0; row < Grid.NUM_ROWS; row++) {
                  if(this.grid[row][c].isVisible()) {
                     point = this.grid[row][c].getPoint();
                     this.grid[row][column].setPoint(point);

                     color = this.grid[row][c].getColor();
                     this.grid[row][column].setColor(color);

                     this.grid[row][c].detachFrom(svg);
                     this.grid[row][column].attachTo(svg);
                  }
               }

               c = Grid.NUM_COLUMNS;
            }

            c++;
         }
      }
   }
}

function Grid_getTile(row, column) {
   if((row < 0) || (row >= Grid.NUM_ROWS)) {
      return undefined;
   }

   if((column < 0) || (column >= Grid.NUM_COLUMNS)) {
      return undefined;
   }

   return this.grid[row][column];
}
