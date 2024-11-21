import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Outlet, redirect, useLoaderData } from "@remix-run/react";
import { Link } from "@remix-run/react";

//me trae todos los usuarios
export let loader: LoaderFunction = async () => {
    const response = await fetch('https://fakestoreapi.com/users');
    const users = await response.json();
    return users;
};


//en este caso el action no es necesario ya que no proceso ningun dato 
/* export let action: ActionFunction = async ({ request, params }) => {
   const { users } = params;
    return redirect(`/listUser/detail/${users}`);
}; */


//FRONTEND - Muestro la lista de usuarios 
export default function UserList() {
    const users = useLoaderData<Array<{ id: number; name: { firstname: string; lastname: string } }>>();
    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map((user: any) => (
                    <li key={user.id}>
                        <Link to={`/listUser/detail/${user.id}`}>{user.name.firstname} {user.name.lastname}</Link>
                    </li>
                ))}
            </ul>
            <Outlet />
        </div>
    );
}