import Layout from "@/components/Layout.js"
export default function NewProduct(){
   return(

      <Layout>
         <h1>Create New Product</h1>
         <input type="text" placeholder="Product Name"/>
         <textarea placeholder="Description"></textarea>
      </Layout>   
   )
}