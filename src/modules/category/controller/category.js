
import CategoryModel from '../../../../DB/model/category.model.js';
import { asynchandlier } from '../../../services/erroeHandling.js';
import fs from 'fs';
import { pathName } from '../../../services/multer.js';
import path from 'path';
import { Error } from 'mongoose';
import ServiceModel from '../../../../DB/model/services.model.js';



// Create categories
export const createCategory = asynchandlier(async (req, res) => {
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
});

// Get all categories
export const getAllCategories = asynchandlier(async (req, res) => {
    const Categories = await CategoryModel.find({recommended: true });
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

        const updatedCategory = await CategoryModel.findByIdAndUpdate(id, { $set:{ ...req.body} }, { new: true });

        if (!updatedCategory) {
            throw new Error(`Category Not Found`);
        }

        res.json({ message: 'Updated Category', data: updatedCategory });
})


// Delete category by ID
export const deleteCategory = asynchandlier(async (req, res, next) => {
    const { id } = req.params;
        let category = await CategoryModel.findById(id);
        if (!category) {
            return next(new Error(`Category Not Found`, 404));
        }
        if (category.image) {
            if (fs.existsSync(category.image)) {
                await fs.promises.unlink(category.image);
                console.log('Old Image Deleted Successfully');
            }
        }
        await CategoryModel.findByIdAndDelete(id);

        res.json({ message: 'Category Deleted', data: category });
});


// Get recommended Category
export const recommendedCategory= asynchandlier(async (req, res) => {

    const { categoryId } = req.params;
    const { recommended } = req.body;
    if (recommended) {
        const recommendedCategoriesCount = await CategoryModel.countDocuments({ recommended: true });

        if (recommendedCategoriesCount >= 4) {
            return res.status(400).json({ message: 'Only four recommended categories are allowed' });
        }
    }

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
        categoryId,
        { recommended },
        { new: true }
    );

    if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found' });
    }
    return res.json({ message: 'Recommended status updated successfully', data: updatedCategory });
});


// Get recommendedItems
export const recommendedItemsHandler = asynchandlier(async (req, res) => {
   
        const  recommendedCategories = await CategoryModel.find({recommended: true });

        const recommendedServices = await ServiceModel.find({ recommended: true });
        const recommendedItems = [
            ...recommendedCategories.map(category => ({ type: 'category', data: category })),
            ...recommendedServices.map(service => ({ type: 'service', data: service }))
        ];

        return res.json({ message: 'Recommended items retrieved successfully', data: recommendedItems });
    
});
