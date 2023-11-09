import Layout from "@/components/Layout.js";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import ProductForm from "@/components/productForm";
import { useState } from "react";

export default function EditProductPage() {
   const [productData, setProductData] = useState();
   const router = useRouter();
   const { id } = router.query;
   useEffect(() => {
      if (!id) {
         return;
      }
      axios.get("/api/products?id=" + id).then((response) => {
         setProductData(response.data);
      });
   }, [id]);
   return (
      <Layout>
         <h1>Editar Producto</h1>
         {productData && (<ProductForm {...productData}/>)}
         
      </Layout>
   );
}



