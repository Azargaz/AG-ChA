const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const functions = require("../../functions")


function testAnkietaMultirowInsert(){
    this.setRows = function(rows){
        this.rows = rows.split(",");
    }
    this.setId = function(id_ankieta){
        this.id_ankieta = id_ankieta;
    }

    this.callMethod = function(){
        return functions.ankietaMultirowInsert(this.rows, this.id_ankieta);
    }    
}

function testbetterResult(){
   
    this.setId1 = function(id1){
        this.id1 = id1;
    }
    this.setScore1 = function(score1){
        this.score1 = score1;
    }

    this.setId2 = function(id2){
        this.id2 = id2;
    }

    this.setScore2 = function(score2){
        this.score2 = score2;
    }

    this.callMethod = function(){
        return functions.betterResult(this.id1, this.score1, this.id2, this.score2);
    }    
}

function testChooseBetterProf(){
   
    this.setId1 = function(id1){
        this.id1 = id1;
    }
    this.setArr1 = function(arr1){
        this.arr1 = arr1.split(',');
    }

    this.setId2 = function(id2){
        this.id2 = id2;
    }

    this.setArr2 = function(arr2){
        this.arr2 = arr2.split(',');
    }

    this.callMethod = function(){
        return functions.chooseBetterProf(this.id1, this.arr1, this.id2, this.arr2);
    }    
}



module.exports.testAnkietaMultirowInsert = testAnkietaMultirowInsert;
module.exports.testbetterResult = testbetterResult;
module.exports.testChooseBetterProf = testChooseBetterProf
