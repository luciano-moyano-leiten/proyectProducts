import { ActionFunction, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useState } from "react";

//creo el action para el login
export const action: ActionFunction = async ({ request }) => {
    //obtengo los datos del formulario y los guardo en la const FormData
    const formData = await request.formData();
    //
    const username = formData.get("username");
    const password = formData.get("password");
//peticion a la api para el login
    const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });
    //si la respuesta no es correcta muestro un mensaje de error
    if (!response.ok) {
        return { error: "Invalid username or password" };
    }
    //si la respuesta es correcta redirijo a la lista de categorias
    const data = await response.json();
    if (data.token) {
        return redirect("/listCategories"); //redirige a la pantalla donde estan las categorias
        //si no es correcta muestra mensaje de error
    } else {
        return { error: "Invalid username or password" };
    }
};

export default function Login() {

    //uso el hook useActionData para obtener los datos de la accion
    const actionData = useActionData();
    //creo los estados para el username y password
    const [username, setUsername] = useState(""); //los estados inician vacios
    const [password, setPassword] = useState(""); //los estados inician vacios

    return (
        <div>
            <h1>Login</h1>
            <Form method="post">
                <div>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={username}
                            //cuando cambia el valor del input se actualiza el estado
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={password}
                            //cuando cambia el valor del input se actualiza el estado, en este caso es el password
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                {/* si hay un error en la accion muestro un mensaje de error en rojo */}
                {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}
                <button type="submit">Login</button>
            </Form>
        </div>
    );
}