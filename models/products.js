import mongoose from "mongoose";

let ProductsModel;

try {
   // Try to retrieve the existing model to avoid OverwriteModelError
   ProductsModel = mongoose.model("Products");
} catch (error) {
   // Define the model if it doesn't exist
   const schema = new mongoose.Schema(
      {
         title: { type: String, required: true, max: 50 },
         description: { type: String, required: true, max: 2500 },
         price: { type: Number, required: true },
         stock: { type: Number, required: false },
         category: { type: String, required: false, max: 50 },
         thumbnail: { type: String, required: false, max: 100 },
      },
      {
         versionKey: false,
      }
   );
   ProductsModel = mongoose.model("Products", schema);
}

export default ProductsModel;
