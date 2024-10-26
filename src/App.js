// App.js
import React, { useState, useEffect } from "react";
import "./App.css";

// Componentes de la página

function HomePage() {
  return <div className="p-8">Bienvenido a nuestra página principal.</div>;
}

function AboutUs() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold">Acerca de Nosotros</h2>
      <div className="mt-8">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="mt-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=..."
          width="600"
          height="450"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

function Catalog() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filter, setFilter] = useState("");

  const products = [
    { id: 1, name: "Producto 1", description: "Descripción del producto 1" },
    { id: 2, name: "Producto 2", description: "Descripción del producto 2" },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-8">
      <input
        type="text"
        placeholder="Filtrar productos"
        onChange={(e) => setFilter(e.target.value)}
        className="border p-2"
      />
      <div className="grid grid-cols-3 gap-4 mt-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="p-4 bg-gray-100">
            <h3 className="text-xl font-bold">{product.name}</h3>
            <button
              className="mt-2 bg-blue-500 text-white py-1 px-4"
              onClick={() => setSelectedProduct(product)}
            >
              Ver más
            </button>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

function ProductModal({ product, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="mt-2">{product.description}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white py-2 px-4"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

function ContactForm() {
  return (
    <form className="max-w-lg mx-auto bg-white p-8 shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700">Nombre</label>
        <input type="text" className="w-full p-2 border" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Correo Electrónico</label>
        <input type="email" className="w-full p-2 border" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Mensaje</label>
        <textarea className="w-full p-2 border"></textarea>
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4">
        Enviar
      </button>
    </form>
  );
}

function Weather() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Lima&appid=YOUR_API_KEY"
    )
      .then((response) => response.json())
      .then((data) => setWeatherData(data));
  }, []);

  if (!weatherData || !weatherData.main) return <p>Cargando...</p>;

  return (
    <div className="p-8">
      <h3 className="text-2xl font-bold">Clima en Lima</h3>
      <p className="mt-2">
        Temperatura: {(weatherData.main.temp - 273.15).toFixed(2)}°C
      </p>
    </div>
  );
}

// Componente principal
function App() {
  return (
    <div className="App">
      <HomePage />
      <AboutUs />
      <Catalog />
      <ContactForm />
      <Weather />
    </div>
  );
}

export default App;
