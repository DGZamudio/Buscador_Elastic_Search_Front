import { Search } from 'lucide-react'

function SeccionBusqueda({setInput}: {setInput:(value: string) => void}) {
  return (
    <>
        <div className="relative rounded-full overflow-hidden bg-white shadow-xl w-100">
            <input
                className="input bg-transparent outline-none border-none pl-6 pr-10 py-5 w-full font-sans text-lg font-semibold"
                placeholder="Busca"
                name="text"
                type="text"
                onChange={(event) => setInput(event.target.value)}
            />
            <div className="absolute right-2 top-[0.4em]">
                <button
                    className="w-14 h-14 rounded-full bg-indigo-500 group shadow-xl flex items-center justify-center relative overflow-hidden"
                >
                <Search 
                    className="relative z-10 text-white"
                    size={30} 
                />
                <div
                    className="w-full h-full rotate-45 absolute left-[32%] top-[32%] bg-black group-hover:-left-[100%] group-hover:-top-[100%] duration-1000"
                ></div>
                <div
                    className="w-full h-full -rotate-45 absolute -left-[32%] -top-[32%] group-hover:left-[100%] group-hover:top-[100%] bg-black duration-1000"
                ></div>
                </button>
            </div>
        </div>
    </>
  )
}

export default SeccionBusqueda
