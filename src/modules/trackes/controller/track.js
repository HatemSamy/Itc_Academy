// const trakeModel = require('../../../databases/models/trackes.model')
// const categoryModel = require('../../../databases/models/category.model')
// const AppError = require('../../utils/AppError')
// const { catchAsyncError } = require('../../middleware/catchAsyncError')
// const cloudinary = require('cloudinary');

// // **********************************************
// cloudinary.v2.config({
//     cloud_name: 'dofg9wmp0', 
//     api_key: '663141422279326', 
//     api_secret: 'R5M35Mx_R9MbiRp2yP_XSuSa3_Y' ,
//     secure: true,
// });
// // **********************************************

// module.exports.createTrakes = catchAsyncError(async (req, res,next) => {
//     try {
//         if (req.file && req.file.path) {
//             cloudinary.v2.uploader.upload(req.file.path, async (error, result) => {
//                 if (error) {
//                     return res.status(500).json({ error: 'Cloudinary upload failed' });
//                 }
//                 const categoryFound = await categoryModel.findById(req.body.categoryId);
//                 if (!categoryFound) {
//                     return next(new AppError('Category Not Found', 409));
//                 }
//                 req.body.image = result.secure_url;
//                 req.body.name = req.body.name || '';
//                 let Trake = new trakeModel(req.body);
//                 await Trake.save();
//                 return res.status(200).json({ message: 'Success', data: Trake });
//             });
//         } else {
//             return res.status(400).json({ error: 'File path not provided' });
//         }

//     } catch (error) {
//         res.status(500).json({ error: 'Unhandled Promise Rejection', message: error.message });
//     }
// });


// module.exports.getAllTrakes = catchAsyncError(async (req, res) => {
//     let Trakes = await trakeModel.find({})
//     res.json({ message: 'this is All Trakes', data: Trakes })
// })
// module.exports.getSpecificTrake = catchAsyncError(async (req, res,next) => {
//     const { id } = req.params
//     let Trake = await trakeModel.findById(id)
//     if (!Trake) {
//         return next(new AppError(`Trake Not Found`, 404))
//     }
//     res.json({ message: 'Success', data: Trake })
// })
// // module.exports.searchProducts = catchAsyncError(async (req, res) => {
// //     let apiFeatuers = new ApiFeatuers(productModel.find(), req.query).search()
// //     let Products = await apiFeatuers.mongooseQuery
// //     res.json({ message: 'this is All Products', Products })
// // })


// module.exports.updateTrake = catchAsyncError( async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         let Trake = await trakeModel.findById(id);
//         if (!Trake) {
//             return next(new AppError(`Trake Not Found`, 404));
//         }
//         if (req.file && req.file.path) {
//             cloudinary.v2.uploader.upload(req.file.path, async (error, result) => {
//                 if (error) {
//                     return res.status(500).json({ error: 'Cloudinary upload failed' });
//                 }
//                 Trake.image = result.secure_url;
//                 Trake.name = req.body.name || Trake.name; 
//                 await Trake.save();
//                 return res.status(200).json({ message: 'Updated Trake with new image', data: Trake });
//             });
//         } else {
//             Trake.name = req.body.name || Trake.name; 
//             Trake.description = req.body.description || Trake.description; 
//             Trake.categoryId = req.body.categoryId || Trake.categoryId; 
//             Trake.diplomaName = req.body.diplomaName || Trake.diplomaName; 
//             Trake.serviceType = req.body.serviceType || Trake.serviceType; 
//             Trake.servicePrice = req.body.servicePrice || Trake.servicePrice; 
//             Trake.serviceTime = req.body.serviceTime || Trake.serviceTime; 
//             await Trake.save();

//             return res.status(200).json({ message: 'Updated Trake without changing the image', data: Trake });
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Unhandled Promise Rejection', message: error.message });
//     }
// });



// module.exports.deleteTrake = catchAsyncError(async (req, res, next) => {
//     const { id } = req.params
//     let Trake = await trakeModel.findByIdAndDelete(id);
//     if (!Trake) {
//         return next(new AppError(`Trake Not Found`, 404))
//     }
//     res.json({ message: 'deleted Trake', data: Trake })
// })
// module.exports.deleteTrake = catchAsyncError(async (req, res, next) => {
//     const { id } = req.params;

//     try {
//         // Find the Trake by ID
//         let Trake = await trakeModel.findById(id);

//         // Check if the Trake exists
//         if (!Trake) {
//             return next(new AppError(`Trake Not Found`, 404));
//         }

//         // Delete the image from Cloudinary
//         if (Trake.image) {
//             const publicId = Trake.image.split('/').pop().split('.')[0];
//             await cloudinary.uploader.destroy(publicId);
//         }

//         // Delete the Trake from the database
//         await trakeModel.findByIdAndDelete(id);

//         res.json({ message: 'Trake Deleted', data: Trake });
//     } catch (error) {
//         next(new AppError('Error deleting Trake', 500));
//     }
// });
