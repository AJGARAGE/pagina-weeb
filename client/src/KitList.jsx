import React, { useEffect, useState } from 'react';

export default function KitList() {
  const [kits, setKits] = useState([]);

  useEffect(() => {
    fetch('/api/kits')
      .then(res => res.json())
      .then(setKits)
      .catch(() => setKits([]));
  }, []);

  return (
    <div>
      <h2>Kits disponibles</h2>
      <ul>
        {kits.map(kit => (
          <li key={kit._id}>
            <strong>{kit.nivel}</strong> - {kit.marca} {kit.modelo} {kit.ano}
            {' '}<a href={kit.linkCompra}>Comprar</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
