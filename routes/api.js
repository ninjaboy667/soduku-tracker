'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value} = req.body;

      //  checks for the puzzle
      if (!puzzle || !coordinate || !value) {
        res.json({ error: 'Required field(s) missing' })
        return
      }

      if (/[^0-9.]/.test(puzzle)) {
        res.json({ error: 'Invalid characters in puzzle' })
        return
      }

      if (puzzle.length !=81) {
        res.json({ error: 'Expected puzzle to be 81 characters long' })
        return
      }

      // check the coordinate
      if (!/^[A-Ia-i][1-9]$/.test(coordinate)) {
        res.json({ error: 'Invalid coordinate'})
        return 
      }

      // check the value
      if (!/^[1-9]$/.test(value)) {
        res.json({ error: 'Invalid value' })
        return
      }
      let puzzleArr = puzzle.split('')

      let checked = solver.validate([...puzzleArr],coordinate,value)

      if (checked==false) {
        res.json({valid: true})
        return
      } else {
        res.json({valid: false, conflict: checked})
        return
      }

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle } = req.body


      if (!puzzle) {
        res.json({ error: 'Required field missing' })
        return
      }

      if (/[^0-9.]/.test(puzzle)) {
        res.json({ error: 'Invalid characters in puzzle' })
        return
      }

      if (puzzle.length !=81) {
        res.json({ error: 'Expected puzzle to be 81 characters long' })
        return
      }

      solver.solutions = [];
      let puzzleArr = puzzle.split('')
      let solvedpuzzle = solver.solve([...puzzleArr]);
      let solution = solver.solutions
      
      if (solver.solutions==false) {
        res.json({ error: 'Puzzle cannot be solved' })
        return
      } else {
        res.json({solution: solution.join('')})
      }



    });
};
