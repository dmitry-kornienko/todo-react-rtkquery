import { useState } from "react";
import { useAddGoodMutation, useDeleteGoodMutation, useGetGoodsQuery } from "./redux";

function App() {
  // передаю количество загружаемых товаров, которое получаю через селект
  const [count, setCount] = useState('');

  const [newGood, setNewGood] = useState('');

  // при вызове данный хук будет делать гет запрос на сервер и возвращать объект
  // т.е. аргумент в хуке будет передан в данный запрос как параметр функции query
  // query запрос сразу делает запрос и возвращает объект
  const { data=[], isLoading } = useGetGoodsQuery(count);

  // данный хук делает mutation-запрос по необходимости и возвращает МАССИВ
  // первый параметр это функция, которая будет запускать хук
  // второй параметр это объект с множеством параметров (как в хуке выше)
  const [addGood, { isError }] = useAddGoodMutation();
  // все по аналогии с добавлением
  const [deleteGood] = useDeleteGoodMutation();

  const handleAddGood = async () => {
    if (newGood) {
      // т.к. функция асинхронная (тк хук добавления асинхронный) то необходимо прописать async/await
      // дополнительный метод unwrap обеспечивает корректную работу всех дополнительных пропов, которые достаем из хука 
      await addGood({name: newGood}).unwrap();
      setNewGood('');
    }
  }
  // удаляю товар
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
