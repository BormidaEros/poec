import { useAuth } from "../context/AuthContext";
import React, { useState } from 'react';
import 'firebase/firestore';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase.js';


export function Home() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { logout, user } = useAuth();
  console.log(user);
  const addProduct = () => {
    if (newProduct.trim() !== '') {
      setProducts([...products, newProduct]);
      setNewProduct('');
    }
  };

  const removeProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const editProduct = (index) => {
    setSelectedProduct({ index, name: products[index] });
  };

  const updateProduct = () => {
    if (selectedProduct && selectedProduct.name.trim() !== '') {
      const updatedProducts = [...products];
      updatedProducts[selectedProduct.index] = selectedProduct.name;
      setProducts(updatedProducts);
      setSelectedProduct(null);
    }
  };
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };
  const [data, setData] = useState('');

  const handleInputChange = (e) => {
    setData(e.target.value);
  };

  const handleSaveData = async () => {
    try {
      const data = {
        dato: data,
      };
      const docRef = await addDoc(collection(db, 'poec'), data);
  
      console.log('Dato guardado exitosamente en Firestore con ID:', docRef.id);
    } catch (error) {
      console.error('Error al guardar el dato:', error);
    }
  
  };

  return (
    <div  className="w-full max-w-xs m-auto text-black">
    <div >
      <h2>Manejo de Productos</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product}
            <button onClick={() => removeProduct(index)}  className="bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 text-black">Eliminar</button>
            <button onClick={() => editProduct(index)}  className="bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 text-black">Editar</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Agregar Producto"
        value={newProduct}
        onChange={(e) => setNewProduct(e.target.value)}
      />
      <button onClick={addProduct} className="bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 text-black">Agregar Producto</button>

      {selectedProduct && (
        <div>
          <input
            type="text"
            value={selectedProduct.name}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct,
                name: e.target.value,
              })
            }
          />
          <button onClick={updateProduct}>Actualizar el producto</button>
        </div>
      )}
    </div>
    
    <div className="w-full max-w-xs m-auto text-black">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className="text-xl mb-4"> Usuario: {user.displayName || user.email}</p>
        <button
          className="bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 text-black"
          onClick={handleLogout}
        >
          Cerrar Sesion
        </button>
      </div>
    </div>
    <div>
      <h2>Enviar Datos a Firebase</h2>
      <input
        type="text"
        placeholder="Ingrese un dato"
        value={data}
        onChange={handleInputChange}
      />
      <button onClick={handleSaveData}>Guardar en Firebase</button>
    </div>
   </div>
    
  );
}
