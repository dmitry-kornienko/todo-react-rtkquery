import { useState } from "react";
import { useAddGoodMutation, useDeleteGoodMutation, useGetGoodsQuery } from "./redux";

function App() {
  const [count, setCount] = useState('');
  const [newGood, setNewGood] = useState('');

  const { data=[], isLoading } = useGetGoodsQuery(count);
  const [addGood] = useAddGoodMutation();
  const [deleteGood] = useDeleteGoodMutation();

  const handleAddGood = async () => {
    if (newGood) {
      await addGood({name: newGood}).unwrap();
      setNewGood('');
    }
  }
  
  const handleDeleteGood = async (id) => {
    await deleteGood(id).unwrap();
  }
  if (isLoading) return <h4>Loading...</h4>

  return (
    <div className="App">
      <input type='text' value={newGood} onChange={(e) => {setNewGood(e.target.value)}} />
      <button onClick={handleAddGood}>Add</button>
      <div>
        <select value={count} onChange={(e) => setCount(e.target.value)}>
          <option value=''>all</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
        </select>
      </div>
      <ul>
        {data.map(item =>
          <li key={item.id} onClick={() => handleDeleteGood(item.id)}>
            {item.name}
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
