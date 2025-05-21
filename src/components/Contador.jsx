import { useState } from 'react';

export default function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
        Contador React en Astro
      </h2>
      <p className="text-center text-3xl font-bold mb-4">{contador}</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setContador(contador - 1)}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Decrementar
        </button>
        <button
          onClick={() => setContador(contador + 1)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          Incrementar
        </button>
      </div>
    </div>
  );
}