import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export let loader: LoaderFunction = async ({ params }) => {
    const { cartProduct } = params;
    try {
        const response = await fetch(`https://fakestoreapi.com/carts/user/${cartProduct}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const cart = data[0];
        const postsWithComments = await Promise.all(cart.products.map(async (post: any) => {
            const response2 = await fetch(`https://fakestoreapi.com/products/${post.productId}`);
            if (!response2.ok) {
                throw new Error("Network response was not ok");
            }
            const products = await response2.json();
            return { ...post, products };
        }));

        return { postsWithComments };
    } catch (error) {
        console.error("Fetch error:", error);
        return { postsWithComments: [] };
    }
};

export let action: LoaderFunction = async ({ request, params }) => {
    const { cartProduct } = params;
    return { cartProduct };
};

export default function CartProductList() {
    const { postsWithComments } = useLoaderData();
    console.log("llega tambien", postsWithComments);
    return (
        <div>
            <h1>Product List</h1>
            <ul>
                {postsWithComments.map((post: any) => (
                    <li key={post.productId}>{post.products.title}</li>
                ))}
            </ul>
        </div>
    );
}