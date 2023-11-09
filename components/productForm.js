import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
export default function ProductForm({
   _id,
   title: prevTitle,
   description: prevDescription,
   price: prevPrice,
   images: prevImages,
}) {
   const router = useRouter();
   const [title, setTitle] = useState(prevTitle || "");
   const [description, setDescription] = useState(prevDescription || "");
   const [price, setPrice] = useState(prevPrice || "");
   const [goToProducts, setGoToProducts] = useState(false);

   async function saveProduct(ev) {
      ev.preventDefault();
      const data = { title, description, price };
      if (_id) {
         await axios.put("/api/products/", { ...data, _id });
      } else {
         await axios.post("/api/products", data);
      }
      setGoToProducts(true);
   }
   if (goToProducts) {
      router.push("/products");
   }
   async function uploadImage(ev) {
      const files = ev.target?.files;
      if (files?.length > 0) {
         const data = new FormData();
         for (const file of files) {
            data.append("file", file);
         }
         const res = await fetch("/api/upload", {
            method: "POST",
            body: data,
         });
         console.log(res.data);
      }
   }

   return (
      <form onSubmit={saveProduct}>
         <label>Nombre</label>
         <input
            type="text"
            placeholder="Nombre"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
         />
         <label>Imagenes </label>
         <div className="mb-2">
            {!prevImages?.length && <div className="mb-2">No hay Imagenes</div>}
            <label
               className="w-24 h-24 border border-dashed border-blue-900 rounded-lg flex flex-col justify-center items-center
               text-center text-blue-900 text-sm bg-stone-100 cursor-pointer"
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
               </svg>
               <div>Subir Imagen</div>
               <input type="file" onChange={uploadImage} className="hidden" />
            </label>
         </div>
         <label>Descripción</label>
         <textarea
            placeholder="Descripción"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
         ></textarea>
         <label>Precio</label>
         <input
            type="number"
            placeholder="Precio"
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
         ></input>
         <button type="submit" className="btn-primary">
            Confirmar
         </button>
      </form>
   );
}
