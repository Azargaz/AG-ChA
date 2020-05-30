const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const functions = require("../../functions")


function testAnkietaMultirowInsert(){
    this.setRows = function(rows){
        this.rows = rows;
    }
    this.setId = function(id_ankieta){
        this.id_ankieta = id_ankieta;
    }

    this.callMethod = function(){
        return functions.ankietaMultirowInsert(this.rows, this.id_ankieta).toString();
    }    
}


module.exports.testAnkietaMultirowInsert = testAnkietaMultirowInsert;
