function factorial(o) {
  if (o == 1) return 1;
  else return o * factorial(o - 1);
}
function Newton_interpolation_forward(x_ter, Y_ter, D) {
  //x value input
  var x = x_ter;
  //creating 2d array
  var y = new Array(x.length);
  for (let i = 0; i < x.length; i++) {
    y[i] = new Array(x.length);
  }
  //y/f(x) value input
  y[0] = Y_ter;
  //calculating the diff table
  for (let i = 0; i < x.length - 1; i++) {
    for (let j = 0; j < x.length - (i + 1); j++) {
      y[i + 1][j] = y[i][j + 1] - y[i][j];
    }
  }
  // ----------
  let OP_diffTable = y; //outputing the diff table
  // ----------
  //value input for X(destination)
  var des = D;
  var U, U_ter;
  U = (des - x[0]) / (x[1] - x[0]);
  // ----------
  let OP_valueU = U;
  // ----------
  var f_x;
  f_x = y[0][0];
  //calculating the f(x) value
  for (let YU = 0; YU <= x.length - 2; YU++) {
    U_ter = 1;
    for (let UY = 0; UY <= YU; UY++) {
      U_ter *= U - UY;
    }
    f_x += (U_ter * y[YU + 1][0]) / factorial(YU + 1);
  }
  // ----------
  let OP_valueFX = f_x;
  // ----------
  return [OP_diffTable, OP_valueU, OP_valueFX];
}
function Newton_interpolation_backward(x_ter, Y_ter, D) {
  //x value input
  var x = x_ter;
  //2d Y value
  var y = new Array(x.length);
  for (let i = 0; i < x.length; i++) {
    y[i] = new Array(x.length);
  }
  //y value initializing
  y[0] = Y_ter;
  //calcilating the diff table
  for (let i = 0; i < x.length - 1; i++) {
    for (let j = 0; j < x.length - (i + 1); j++) {
      y[i + 1][j] = y[i][j + 1] - y[i][j];
    }
  }
  // ----------
  let OP_diffTable = y; //outputing the diff table
  // ----------
  //value input for X(destination)
  var des = D;
  var U, U_ter;
  U = (des - x[x.length - 1]) / (x[1] - x[0]);
  // ----------
  let OP_valueU = U;
  // ----------
  var f_x;
  f_x = y[0][x.length - 1];
  //calculating the f(x) value
  for (let YU = 0; YU <= x.length - 2; YU++) {
    U_ter = 1;
    for (let UY = 0; UY <= YU; UY++) {
      U_ter *= U + UY;
    }
    f_x += (U_ter * y[YU + 1][x.length - (YU + 2)]) / factorial(YU + 1);
  }
  // ----------
  let OP_valueFX = f_x;
  // ----------
  return [OP_diffTable, OP_valueU, OP_valueFX];
}
function Lagranges(let_x, let_y, H) {
  var x = let_x,
    y = let_y,
    X = H;
  var f_x = 0,
    f_y = 0;
  var L = new Array(x.length);
  for (var ROW = 0; ROW < x.length; ROW++) {
    f_x = 1;
    f_y = 1;
    for (var COL = 0; COL < x.length; COL++) {
      if (ROW != COL) {
        f_x *= X - x[COL];
        f_y *= x[ROW] - x[COL];
      }
      L[ROW] = f_x / f_y;
    }
  }
  console.log(L);
  /*console.log("----After l val-----");*/
  f_x = 0;
  for (var i = 0; i < x.length; i++) {
    f_x += y[i] * L[i];
  }
  console.log(f_x);
}
/* var x = [1, 2, 3, 4, 5];
var y = [2, 9, 28, 65, 126];
var d = 1.5;
if (x.length == y.length) {
  Newton_interpolation_backward(x, y, d);
  Newton_interpolation_forward(x, y, d);
  Lagranges(x, y, d);
} else console.log("The length of X and Y should be same:)");
 */
