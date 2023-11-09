import clientPromise from "@/lib/mongodb";
import { mongooseConnect } from "@/lib/mongoose";
import ProductsModel from "@/models/products";
import mongoose from "mongoose";

export default async function handle(req, res) {
   const { method } = req;
   await mongooseConnect();
   if (method === "GET") {
      if (req.query?.id) {
         res.json(await ProductsModel.findOne({ _id: req.query.id }));
      } else {
         const products = await ProductsModel.find({});
         res.json(products);
      }
   }
   if (method === "PUT") {
      const { title, description, price, _id } = req.body;
      const productDoc = await ProductsModel.updateOne({ _id }, { title, description, price });
      res.json(productDoc);
   }

   if (method === "POST") {
      const { title, description, price } = req.body;
      const productDoc = await ProductsModel.create({ title, description, price });
      res.json(productDoc);
   }

   if (method === "DELETE") {
      if (req.query?.id) {
         await ProductsModel.deleteOne({ _id: req.query?.id });
      }
      res.json(true)
   }
}
