import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DeleteProductPage() {
   const router = useRouter();
   const [productData, setProductData] = useState("");
   const { id } = router.query;
   useEffect(() => {
      if (!id) {
         return;
      }
      axios.get("/api/products?id=" + id).then((response) => {
         setProductData(response.data);
      });
   }, [id]);
   function goBack() {
      router.push("/products");
   }
   async function deleteProduct() {
      await axios.delete("/api/products/?id=" + id);
      goBack();
   }
   return (
      <Layout>
         <h1 className="mb-4 text-center">
            Estás Seguro que deseas eliminar el producto "{productData?.title}" ?
         </h1>
         <div className="flex gap-2 justify-center">
            <button className=" btn-delete" onClick={deleteProduct}>
               Si, Eliminar
            </button>
            <button className=" btn-primary" onClick={goBack}>
               No, Cancelar
            </button>
         </div>
      </Layout>
   );
}
