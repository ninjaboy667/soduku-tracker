class SudokuSolver {
  constructor() {
    this.solutions = [];
  }
  
  validate(puzzlesplit,coordinate,value) {
    // 

    let areas = []

    let sudokoMatrix = {
      a: [],
      b: [],
      c: [],
      d: [],
      e: [],
      f: [],
      g: [],
      h: [],
      i: [],
    }



    for (let i=0;i<9;i++){
      for (let j=0; j<9;j++) {
        sudokoMatrix[Object.keys(sudokoMatrix)[i]].push(puzzlesplit.shift())
      }  
    }

    // check the coordinate
    let row = coordinate.split('')[0].toLowerCase();
    let column = coordinate.split('')[1]-1; //0 based index so 1-9 -> 0-8

    
    // the location should be . as it will be overwritten with the value
    sudokoMatrix[row][column] = "." 

    // pushes the row if invalid for said row
    if (this.checkRowPlacement(sudokoMatrix,row,column,value)==false) {
      areas.push("row")
    }

    // pushes column if value is invalid for said column
    if (this.checkColPlacement(sudokoMatrix,row,column,value)==false) {
      areas.push("column")
    }

    // pushes region if value is invalid for said region
    if (this.checkRegionPlacement(sudokoMatrix,row,column,value)==false) {
      areas.push("region")
    }


    return areas
  }

  checkRowPlacement(puzzleString, row, column, value) {
    value = value.toString()

    if (puzzleString[row].includes(value)) {
      return false
    } else {
      return true
    }
  }

  checkColPlacement(puzzleString, row, column, value) {
    value = value.toString()

    // iterate through the 9 letters
    for (let i=0; i<9; i++) {
      if (puzzleString[Object.keys(puzzleString)[i]][column] == value) {
        return false
      }
    }
    
    return true
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    value = value.toString()
    const ps = puzzleString;
    let region= [], regionValues = [];

    region[0] = ['a','b','c',0,1,2], regionValues[0] = [ ps.a[0], ps.a[1], ps.a[2], ps.b[0], ps.b[1], ps.b[2], ps.c[0], ps.c[1], ps.c[2]];
    region[1] = ['a','b','c',3,4,5], regionValues[1] = [ ps.a[3], ps.a[4], ps.a[5], ps.b[3], ps.b[4], ps.b[5], ps.c[3], ps.c[4], ps.c[5]];
    region[2] = ['a','b','c',6,7,8], regionValues[2] = [ ps.a[6], ps.a[7], ps.a[8], ps.b[6], ps.b[7], ps.b[8], ps.c[6], ps.c[7], ps.c[8]];

    region[3] = ['d','e','f',0,1,2], regionValues[3] = [ ps.d[0], ps.d[1], ps.d[2], ps.e[0], ps.e[1], ps.e[2], ps.f[0], ps.f[1], ps.f[2]];
    region[4] = ['d','e','f',3,4,5], regionValues[4] = [ ps.d[3], ps.d[4], ps.d[5], ps.e[3], ps.e[4], ps.e[5], ps.f[3], ps.f[4], ps.f[5]];
    region[5] = ['d','e','f',6,7,8], regionValues[5] = [ ps.d[6], ps.d[7], ps.d[8], ps.e[6], ps.e[7], ps.e[8], ps.f[6], ps.f[7], ps.f[8]];

    region[6] = ['g','h','i',0,1,2], regionValues[6] = [ ps.g[0], ps.g[1], ps.g[2], ps.h[0], ps.h[1], ps.h[2], ps.i[0], ps.i[1], ps.i[2]];
    region[7] = ['g','h','i',3,4,5], regionValues[7] = [ ps.g[3], ps.g[4], ps.g[5], ps.h[3], ps.h[4], ps.h[5], ps.i[3], ps.i[4], ps.i[5]];
    region[8] = ['g','h','i',6,7,8], regionValues[8] = [ ps.g[6], ps.g[7], ps.g[8], ps.h[6], ps.h[7], ps.h[8], ps.i[6], ps.i[7], ps.i[8]];

    for (let i=0;i<9;i++){
      if (region[i].includes(row) && region[i].includes(column)) {
        if (regionValues[i].includes(value)) {
          return false
        }
      }
    }
    return true
  }

  solve(puzzleArr) {

    //puzzleArr = [...puzzleArr]

let switchBlock = { 0:  "a1",1:  "a2",2:  "a3",3:  "a4",4:  "a5",5:  "a6",6:  "a7",7:  "a8",8: "a9",
                    9:  "b1",10: "b2",11: "b3",12: "b4",13: "b5",14: "b6",15: "b7",16: "b8",17: "b9",
                    18: "c1",19: "c2",20: "c3",21: "c4",22: "c5",23: "c6",24: "c7",25: "c8",26: "c9",
                    27: "d1",28: "d2",29: "d3",30: "d4",31: "d5",32: "d6",33: "d7",34: "d8",35: "d9",
                    36: "e1",37: "e2",38: "e3",39: "e4",40: "e5",41: "e6",42: "e7",43: "e8",44: "e9",
                    45: "f1",46: "f2",47: "f3",48: "f4",49: "f5",50: "f6",51: "f7",52: "f8",53: "f9",
                    54: "g1",55: "g2",56: "g3",57: "g4",58: "g5",59: "g6",60: "g7",61: "g8",62: "g9",
                    63: "h1",64: "h2",65: "h3",66: "h4",67: "h5",68: "h6",69: "h7",70: "h8",71: "h9",
                    72: "i1",73: "i2",74: "i3",75: "i4",76: "i5",77: "i6",78: "i7",79: "i8",80: "i9",
}
  //puzzleArr.length
  for (let i=0; i<puzzleArr.length; i++) {
    

    if (puzzleArr[i] === ".") {
      for (let j=1; j<=9; j++) {
        

        // send the validate function a new array or it modifys the old [...puzzleArr]
        let coordinate = switchBlock[i];

        
        if(this.validate([...puzzleArr],coordinate,j)==false) {

          puzzleArr[i] = j.toString();
          
          // the number is successfull 
          if (this.solve([...puzzleArr])===true){
            if (i=="80" && this.validate([...puzzleArr],coordinate,j)==false) {this.solutions = puzzleArr}
            return true
          } else {
            //ABSOLUTELY NOTHING
          }
        } else {

        }

      }
      return false
    }

    
  }

return true


     
    
  }


}

module.exports = SudokuSolver;

