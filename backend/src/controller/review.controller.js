import Review from '../models/review.model.js'
import { User } from '../models/user.model.js'
import {Product} from '../models/product.model.js'
import {Review} from '../models/review.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ErrorResponse } from '../utils/ErrorResponse'
import { ApiResponse } from '../utils/ApiResponse'
import mongoose from 'mongoose'




const addReview = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.user?._id);
    if (!user) {
      throw new ErrorResponse(401, "Unauthorized access request");
    }
  
    
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      throw new ErrorResponse(404, "Product not found");
    }
  
    
    const { rating, comment } = req.body;
    if (rating === undefined || rating === null || isNaN(rating) || rating < 1 || rating > 5) {
      throw new ErrorResponse(400, "Rating must be a number between 1 and 5");
    }
    
  
  
    const review = await Review.create({
      user: user._id, 
      product: product._id, 
      rating,
      comment,
    });
  
   
    const createdReview = await Review.findById(review._id).select("-user");
    if (!createdReview) {
      throw new ErrorResponse(500, "Failed to add review!");
    }
  
    
    return res.status(200).json(
      new ApiResponse(200, createdReview, "Review added successfully!")
    );
  });
  


  const getProductReviews = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id);
    if (!user) {
      throw new ErrorResponse(401, "Unauthorized request!");
    }
  
    const { ProductId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(ProductId)) {
      throw new ErrorResponse(400, "Invalid Product ID");
    }
  
    const reviews = await Product.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(ProductId),
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "product",
          as: "productReviews",
        },
      },
      {
        $unwind: "$productReviews",
      },
      {
        $lookup: {
          from: "users",
          localField: "productReviews.user",
          foreignField: "_id",
          as: "productReviews.reviewedBy",
        },
      },
      {
        $unwind: "$productReviews.reviewedBy",
      },
      {
        $project: {
          "productReviews._id": 1,
          "productReviews.rating": 1,
          "productReviews.comment": 1,
          "productReviews.createdAt": 1,
          "productReviews.reviewedBy.avatar": 1,
          "productReviews.reviewedBy.fullname": 1,
        },
      },
    ]);
  
    if (!reviews || reviews.length === 0) {
      throw new ErrorResponse(404, "No reviews found for the product");
    }
  
    return res.status(200).json(
      new ApiResponse(200, reviews, "Product reviews successfully fetched")
    );
  });



  const deleteReview = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id);
    if (!user) {
      throw new ErrorResponse(401, "Unauthorized access!");
    }
  
    const { reviewId } = req.params;
  
    
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      throw new ErrorResponse(400, "Invalid review ID");
    }
  
    
    const reviewToDelete = await Review.findOneAndDelete({
      _id: reviewId,
      user: user._id, 
    });
  
    if (!reviewToDelete) {
      throw new ErrorResponse(404, "Review not found or not authorized to delete");
    }
  
    return res.status(200).json(
      new ApiResponse(200, reviewToDelete, "Review deleted successfully!")
    );
  });


  const updateReview = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id);
    if (!user) {
      throw new ErrorResponse(401, "Unauthorized access!");
    }
  
    const { reviewId } = req.params;
    const { newRating, newComment } = req.body;
  
    
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      throw new ErrorResponse(400, "Invalid review ID");
    }
  
    if (newRating === undefined || newRating === null || isNaN(newRating) || newRating < 1 || newRating > 5) {
      throw new ErrorResponse(400, "Rating must be a number between 1 and 5");
    }
    
  
    if (!newComment || newComment.trim().length === 0) {
      throw new ErrorResponse(400, "Comment cannot be empty");
    }
  
    const updatedReview = await Review.findOneAndUpdate(
      { _id: reviewId, user: user._id }, 
      { rating: newRating, comment: newComment },
      { new: true } 
    );
  
    if (!updatedReview) {
      throw new ErrorResponse(404, "Review not found or not authorized to update");
    }
  
    return res.status(200).json(
      new ApiResponse(200, updatedReview, "Review updated successfully!")
    );
  });
  
  

export {
    addReview,
    getProductReviews,
    deleteReview,
    updateReview

}