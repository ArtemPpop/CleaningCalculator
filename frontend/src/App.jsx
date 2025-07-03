import { useState } from 'react';
import './App.css';

function App() {
  const [objectData, setObjectData] = useState({
    client_id: 1,
    name: '',
    address: '',
    type: 'офис',
    work_schedule: '',
    start_date: '',
    contract_duration: ''
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setObjectData({ ...objectData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const created = await fetch('http://localhost:5000/api/objects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(objectData)
      }).then(res => res.json());

      const calculated = await fetch('http://localhost:5000/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ object_id: created.id })
      }).then(res => res.json());

      const proposal = await fetch('http://localhost:5000/api/proposals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: created.client_id,
          object_id: created.id,
          total_cost: calculated.totalCost,
          cost_without_vat: calculated.costWithoutVAT,
          vat: calculated.vat
        })
      }).then(res => res.json());

      setResult({ created, calculated, proposal });
    } catch (err) {
      console.error(err);
      alert('Ошибка');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Проверка API расчёта и создания предложения</h1>
      <input type="text" name="name" placeholder="Название объекта" onChange={handleChange} />
      <input type="text" name="address" placeholder="Адрес" onChange={handleChange} />
      <input type="text" name="type" placeholder="Тип (офис, ТЦ...)" onChange={handleChange} />
      <input type="text" name="work_schedule" placeholder="График работ" onChange={handleChange} />
      <input type="date" name="start_date" onChange={handleChange} />
      <input type="text" name="contract_duration" placeholder="Срок контракта" onChange={handleChange} />
      <br /><br />
      <button onClick={handleSubmit}>Создать и рассчитать</button>

      {result && (
        <pre style={{ background: '#eee', padding: '1rem', marginTop: '1rem' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;
