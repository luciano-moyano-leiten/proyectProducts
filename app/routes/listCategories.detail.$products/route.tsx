import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
}

export let loader: LoaderFunction = async ({ params }) => {
    const { products } = params;
    const response = await fetch(`https://fakestoreapi.com/products/category/${products}`);
        const categories: Product[] = await response.json();
        return categories;
   
};



export let action: LoaderFunction = async ({ request, params }) => {
    const { products } = params;
    return { products };
}


export default function CategoryDetail() {
    const categories = useLoaderData<Product[]>();

    return (
        <div>
            <h1>Category Products</h1>
            <ul>
                {categories.map((product: Product) => (
                    <li key={product.id}>
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}