"use strict";

var path = require('path');

// Google Cloud Storage Setup :
const keyFilename = './exim-food-firebase-adminsdk-nsw0f-b78e25c82b.json';
const projectId = 'exim-food';
const bucketName = 'exim-food.appspot.com';

const gcs = require('@google-cloud/storage')(
{
	projectId,
	keyFilename		
});

const bucket = gcs.bucket(bucketName);

// Firebase App:

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _firebase = require("firebase");

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
    apiKey: "AIzaSyDib8fiktUwM4h_yPTmNtYA5aC-Zrzufeg",
    authDomain: "exim-food.firebaseapp.com",
    databaseURL: "https://exim-food.firebaseio.com",
    projectId: "exim-food",
    storageBucket: "exim-food.appspot.com",
    messagingSenderId: "769795342410"
};

const firebase = _firebase2.default.initializeApp(config)

var fire = {
	database: function () { return firebase.database(); },
	str_bucket: function () { return bucket; }
};

exports.default = fire;
