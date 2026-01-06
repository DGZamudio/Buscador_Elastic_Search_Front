"use client"
import SeccionBusqueda from "@/components/search/SeccionBusqueda";
import { useEffect, useState } from "react";

interface cositos {
    _score:number;
    _source:{
        title:string;
        body:string;
        Epigrafe:string;
        Year: string;
        Numero: string,
        Tipo: string;
        Entidad: string;
        "Sigla-Entidad": string;
        Nombre: string;
        NombreEpigrafe: string;
    };

}

export default function Home() {
    const [input, setInput] = useState<string>("");
    const [data, setData] = useState<cositos[]>([]);

    async function search(input:string) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/regular_search/?search_query=${input}`)

            if (!response.ok) {
                throw new Error("Error http")
            }
            
            const data = await response.json()

            if (data) {
                setData(data.hits)
            }
        } catch(error) {
            console.error("Un error ha ocurrido", error)
        }            
    }

    useEffect(() => {
        search(input)
    },[input])

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex flex-col w-max h-max justify-center items-center">
            <div className="flex flex-col gap-50 justify-center items-center bg-indigo-300 rounded-md px-15 py-10">
                <h1 className="text-3xl font-semibold text-black">
                    Buscador :p
                </h1>
                <SeccionBusqueda 
                    setInput={setInput}
                />

                <div className="flex flex-col gap-5">
                    {data.map((cosito, index) => (
                        <div className="flex bg-white flex-col p-5 rounded" key={index}>
                            <h3>{cosito._source.title}</h3>
                            <p>{cosito._source.Entidad}</p>
                            <p>{cosito._source.Epigrafe.slice(0,250)}</p>
                        </div>
                    ))}
                </div>

            </div>
        </main>
    </div>
  );
}
