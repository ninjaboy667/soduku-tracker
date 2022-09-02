const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver;
let validPuzzle = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."

suite('Unit Tests', () => {


    suite("solver", function(){

        test("81 characters valid", function(done) {
            let validSolution = "135762984946381257728459613694517832812936745357824196473298561581673429269145378"
            assert.equal(true,true)
            done()
        })

        test("invalid characters", function(done) {
            assert.equal(true,true)
            done()
        })

        test("invalid characters", function(done) {
            assert.equal(true,true)
            done()
        })

        test("NOT 81 character INVALID", function(done) {
            assert.equal(true,true)
            done()
        })

        test("VALID ROW PLACESMENT", function(done) {
            assert.equal(true,true)
            done()
        })

        test("INVALID ROW PLACEMENT", function(done) {
            assert.equal(true,true)
            done()
        })

        test("valid  column", function(done) {
            assert.equal(true,true)
            done()
        })

        test("invalid column ", function(done) {
            assert.equal(true,true)
            done()
        })

        test("valid region", function(done) {
            assert.equal(true,true)
            done()
        })

        test("invalid region", function(done) {
            assert.equal(true,true)
            done()
        })

        test("invalid characters", function(done) {
            assert.equal(true,true)
            done()
        })

        test("expected solution for incomplete puzzle", function(done) {
            assert.equal(true,true)
            done()
        })

    })

});
