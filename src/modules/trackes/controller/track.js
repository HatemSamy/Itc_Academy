import trakeModel from '../../../databases/models/trackes.model';
import categoryModel from '../../../databases/models/category.model';

import { asynchandlier } from '../../../services/erroeHandling';
import TrackModel from '../../../../DB/model/track.model';







// **********************************************

// export const createTrakes = asynchandlier(async (req, res, next) => {
//     try {
//         if (!req.file && req.file.path) {
//             return next(new Error("image is required"))

//         }

//         const categoryFound = await categoryModel.findById(req.body.categoryId);
//         if (!categoryFound) {
//             return next(new Error('Category Not Found', { cause: 404 }));
//         }
//         const image = req.file;
//         const newImageUrl = image ? image.path : '';
//         req.body.image = newImageUrl
//         req.body.serviceId = req.params.serviceId
//         const Trak = new TrackModel(req.body);
//         await Trak.save();
//         return res.status(200).json({ message: 'Success', data: Trak });


//     } catch (error) {
//         return next(new Error('cach_error', { cause: 500 }));

//     }
// });

// export const getAllTraks = asynchandlier(async (req, res) => {
//     const Traks = await TrackModel.find({});
//     if (!Traks) {
//         return next(new Error(`Trak Not Found`, { cause: 404 }));

//     }
//     res.json({ message: 'this is All Traks', data: Traks });
// });


// export const getSpecificTrake = asynchandlier(async (req, res, next) => {
//     const { id } = req.params;
//     const Trak = await trakeModel.findById(id);
//     if (!Trak) {
//         return next(new Error(`Trak Not Found`, 404));
//     }
//     res.json({ message: 'Success', data: Trak });
// });

// export const updateTrake = asynchandlier(async (req, res, next) => {
//     try {
//         const { id } = req.params;

//         let updateFields = req.body;
//         if (req.file && req.file.path) {
//             updateFields.image = req.file.path;
//         }

//         const updatedTrak = await trakeModel.findByIdAndUpdate(id, updateFields, { new: true });

//         if (!updatedTrak) {
//             return next(new Error(`Trak Not Found`, { cause: 404 }));
//         }

//         if (req.file && req.file.path) {
//             return res.status(200).json({ message: 'Updated Trak with new image', data: updatedTrak });
//         } else {
//             return res.status(200).json({ message: 'Updated Trak without changing the image', data: updatedTrak });
//         }
//     } catch (error) {
//         return next(new Error(`cach_error`, { cause: 500 }));

//     }
// });


// export const deleteTrake = asynchandlier(async (req, res, next) => {
//     const { id } = req.params;
//     try {
//         let Trake = await trakeModel.findById(id);
//         if (!Trake) {
//             return next(new Error(`Trake Not Found`, 404));
//         }
//         if (Trake.image) {
//             const publicId = Trake.image.split('/').pop().split('.')[0];
//             await cloudinary.v2.uploader.destroy(publicId);
//         }
//         await trakeModel.findByIdAndDelete(id);
//         res.json({ message: 'deleted Trake', data: Trake });
//     } catch (error) {
//         next(new Error('Error deleting Trake', 500));
//     }
// });
