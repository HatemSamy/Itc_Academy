
import CategoryModel from '../../../../DB/model/category.model.js';
import { asynchandlier } from '../../../services/erroeHandling.js';
import ServiceModel from '../../../../DB/model/services.model.js';
import fs from 'fs';

// Create a service
export const createService = asynchandlier(async (req, res, next) => {
        const {categoryId}= req.params
        if (req.file && req.file.path) {
            const categoryFound = await CategoryModel.findById(categoryId);
            if (!categoryFound) {
                return next(new Error('Category Not Found', 404));
            }
            const image = req.file
            req.body.image =image.filename ;
            req.body.imageUrl = image.path ;
            req.body.categoryId= categoryId
            const service = new ServiceModel(req.body);
            await service.save();
            return res.status(200).json({ message: 'Success', data: service });
        } else {
            return res.status(400).json({ error: 'image not provided' });
        }
});

//Get all services
export const getAllServices = asynchandlier(async (req, res, next) => {
       
        if (req.params.categoryId) {
            const categoryFound = await CategoryModel.findById(req.params.categoryId);
            if (!categoryFound) {
                return next(new Error('Category Not Found', 409));
            }
            const services = await ServiceModel.find({categoryId:req.params.categoryId});
            res.json({ message: `This is All Services in category:${categoryFound.name}`, data: services });
        }
  
});

// Update a service
export const updateService = asynchandlier(async (req, res, next) => {
    const { id } = req.params;

        const oldService = await ServiceModel.findById(id);

        if (req.file) {
            const image = req.file;
            req.body.image =image.filename ;
            req.body.imageUrl = image.path ;

            if (oldService) {
                console.log(oldService.imageUrl);
                if (fs.existsSync(oldService.imageUrl)) {
                    await fs.promises.unlink(oldService.imageUrl);
                    console.log('Old Image Deleted Successfully');
                } else {
                    console.log('Old Image File Not Found');
                }
            }
        }

        const updatedService = await ServiceModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedService) {
            next (new Error(`Service Not Found`, 404));
        }
        res.json({ message: 'Updated Service', data: updatedService });
});

// Get a specific service
export const getSpecificService = asynchandlier(async (req, res, next) => {
        const { id } = req.params;
        const service = await ServiceModel.findById(id);
        if (!service) {
            return next(new Error(`Service Not Found`, 404));
        }
        res.json({ message: 'Success', data: service });
});

// // Delete a service
export const deleteService = asynchandlier(async (req, res, next) => {

        const { id } = req.params;
        const service = await ServiceModel.findById(id);
        if (!service) {
            return next(new Error(`Service Not Found`, 404));
        }
        if (service.imageUrl) {
            if (fs.existsSync(service.imageUrl)) {
                await fs.promises.unlink(service.imageUrl);
                console.log('Old Image Deleted Successfully');
            } else {
                console.log('Old Image File Not Found');
            }
        }
        await ServiceModel.findByIdAndDelete(id);
        res.json({ message: 'Service Deleted', data: service });
    
});



export const setRecommendedStatusForService = asynchandlier(async (req, res) => {
        const { serviceId } = req.params;
        const { recommended } = req.body;
        if (recommended) {
            const recommendedServicesCount = await ServiceModel.countDocuments({ recommended: true });

            if (recommendedServicesCount >= 6) {
                return res.status(400).json({ message: 'Only six recommended services are allowed' });
            }
        }

        const updatedService = await ServiceModel.findByIdAndUpdate(
            serviceId,
            { recommended },
            { new: true }
        );

        if (!updatedService) {
            return res.status(404).json({ message: 'Service not found' });
        }

        return res.json({ message: 'Recommended status updated successfully', data: updatedService });
    }
)