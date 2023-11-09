import Layout from "@/components/Layout.js";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ProductForm from "@/components/productForm";
export default function NewProduct() {
   return (
      <Layout>
         <h1>Crear Producto</h1>
         <ProductForm />
      </Layout>
   );
}
