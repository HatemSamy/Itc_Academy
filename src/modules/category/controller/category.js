
import CategoryModel from '../../../../DB/model/category.model.js';
import { asynchandlier } from '../../../services/erroeHandling.js';
import fs from 'fs';
import { pathName } from '../../../services/multer.js';
import path from 'path';
import { Error } from 'mongoose';



// Create categories
export const createCategory = asynchandlier(async (req, res) => {
    try {
        if (req.file && req.file.path) {
            const image = req.file;
            const newImageUrl = image ? image.path : '';
            const newImageId = image ? image.filename : '';
             req.body.image =newImageUrl
             req.body.imageId = newImageId

             const category= await CategoryModel.create(req.body)
            return res.status(200).json({ message: 'category has been created',category});

        } else {
            return res.status(400).json({ error: 'image is required' });
        }
    } catch (error) {
        console.log("catch error",error);
        return res.status(200).json({ message: 'catch error', error});
    }
});

// Get all categories
export const getAllCategories = asynchandlier(async (req, res) => {
    const Categories = await CategoryModel.find({});
    res.json({ message: 'All Categories', data: Categories });
});

// Get specific category by ID
export const getSpecificCategory = asynchandlier(async (req, res,next) => {
    const { id } = req.params;
    const Category = await CategoryModel.findById(id);
    if (!Category) {
        next (new Error("Category not found"))
    }
    res.json({ message: 'Success', data: Category });
});

// Update category by ID
export const updateCategory = asynchandlier( async (req, res, next) => {
    const { id } = req.params;

    try {
        const oldCategory = await CategoryModel.findById(id);

        if (req.file) {
            const image = req.file;
            req.body.image = image.path;
            req.body.imageId = image.filename;

            if (oldCategory && oldCategory.imageId) {
        
                // Check if the old image file exists before trying to delete
                console.log('Old Image Path:', oldCategory.image);
                if (fs.existsSync(oldCategory.image)) {
                    await fs.promises.unlink(oldCategory.image);
                    console.log('Old Image Deleted Successfully');
                } else {
                    console.log('Old Image File Not Found');
                }
            }
        }

        const updatedCategory = await CategoryModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedCategory) {
            throw new Error(`Category Not Found`);
        }

        res.json({ message: 'Updated Category', data: updatedCategory });
    } catch (error) {
        console.log("catch error",error);
       return res.status(200).json({ message: 'error updating category', error});
    }
})



// Delete category by ID
export const deleteCategory = asynchandlier(async (req, res, next) => {
    const { id } = req.params;

    try {
        // Find the category by ID
        let category = await CategoryModel.findById(id);

        // Check if the category exists
        if (!category) {
            return next(new Error(`Category Not Found`, 404));
        }

        // Delete the image from Cloudinary
        if (category.image) {
            if (fs.existsSync(category.image)) {
                await fs.promises.unlink(category.image);
                console.log('Old Image Deleted Successfully');
            }
        }

        // Delete the category from the database
        await CategoryModel.findByIdAndDelete(id);

        res.json({ message: 'Category Deleted', data: category });
    } catch (error) {
        console.log("catch error",error);
        return res.status(200).json({ message: 'Error deleting category', error});
    }
});
