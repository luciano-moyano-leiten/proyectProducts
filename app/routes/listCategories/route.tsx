import { useLoaderData, Link, Outlet } from "@remix-run/react";
import { LoaderFunction, redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";

    
    //peticion a la lista de categorias
export let loader: LoaderFunction = async ({ params }) => {
    const { category } = params;
        const response = await fetch(`https://fakestoreapi.com/products/categories`);
        const categories = await response.json();
        return categories;
   
};


//mostrar la lista de categorias

export let action: ActionFunction = async ({ request, params }) => {
    const { category } = params;
    return redirect(`/listCategories/${category}`);
};



//muestro la lista de categorias
export default function Categories() {
    const categories = useLoaderData<string[]>();

    return (
        <div>
            <h1>Categories</h1>
            <ul>
                {categories.map((category: string) => (
                    <li key={category}>
                        <Link to={`/listCategories/detail/${category}`}>{category}</Link>
                    </li>
                ))}
            </ul>
            <Outlet/>
        </div>
    );
}