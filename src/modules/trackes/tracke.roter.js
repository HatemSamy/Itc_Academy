// const app = require('express').Router()
// const { uploadSingleImage } = require('../../middleware/fileUpload')
// const { protectedRoutes } = require('../auth/auth.service')
// const { createTrakes, getSpecificTrake, deleteTrake, updateTrake, getAllTrakes } = require('./tracke.service')
// app.route('/').post(protectedRoutes,uploadSingleImage('image' , 'Trakes'), createTrakes).get(getAllTrakes)

// app.route('/:id').get(getSpecificTrake).delete(deleteTrake).put(uploadSingleImage('image' , 'Trakes'),updateTrake)
// module.exports = app