import { useState, useEffect } from 'react'

// import ThemeToggle from './components'
import { CirclePlus, CircleX, CircleCheckBig, Trash2, FolderOpenDot } from 'lucide-react';
import './App.css'

function App() {
	const tasks = JSON.parse(localStorage.getItem('tasks'))

  const [input, setInput] = useState('')
  const [list, setList] = useState(tasks !== null ? tasks : [])

  const addTask = () => {
    if (input) {
			const inputVal = input.trim()[0].toUpperCase() + input.slice(1)
      const task = {
        task: inputVal,
        completed: false,
      }
      setList([...list, task])
      setInput('')
    }
  }

	const changeStatus = (index) => () => {
		const newList = [...list]
		newList[index].completed = !newList[index].completed
		setList(newList)
	}

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(list))
	}
	, [list])

  return (
    <>
      <div className="outer-container bg-black">
      <div className="flex-col container mx-auto p-4 bg-white">
        {/* <ThemeToggle /> */}
        <h1 className="text-2xl font-bold text-left my-4 text-blue-800">Task Tracker</h1>
        <div className="flex items-center my-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            placeholder="Add new Task..."
            className="w-6/8 p-2 px-3 rounded-lg border border-gray-300 border-2 focus:border-blue-500 outline-none text-gray-700 mr-3"
          />
          <button
            onClick={addTask}
            className="shadow-md flex justify-around items-center p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-800 cursor-pointer"
          >
            <CirclePlus size={18} className="mr-1" />
            Add Task
          </button>
        </div>
				<h1 className="text-2xl font-bold text-left my-4 text-blue-800 mt-10">Tasks:</h1>
				{list.length === 0 &&
          <p className=" flex items-center text-center text-2xl text-gray-500 mt-6">
						<FolderOpenDot size={44} className=" text-gray-500" />
						No tasks added yet.
					</p>
				}
        <ul className="text-black p-0 mt-3 overflow-y-auto" style={{maxHeight: '60vh'}}>
          {list.map((item, index) => (
            <li key={index} 
              className={`${item.completed ? 'bg-gray-100' : ''} flex items-center border-2 rounded-xl border-gray-200 
							text-left p-2 px-3 mb-4 hover:shadow-md transition duration-300 border-blue-100`}
            >
              <button className="cursor-pointer mr-2" onClick={changeStatus(index)}>
                {item.completed ?
                  <CircleCheckBig size={19} className="mr-1 text-green-600" />
                  : <CircleX size={19} className="mr-1 text-gray-400 hover:text-blue-600" />
                }
              </button>
							<p className='text-lg'>
								{item.completed ? <del>{item.task}</del> : item.task}
							</p>
							<button className="ml-auto text-gray-500 hover:text-red-700 cursor-pointer" onClick={() => setList(list.filter((_, i) => i !== index))}>
                <Trash2 size={18} className="mr-1 text-gray-400 hover:text-red-700" />
              </button>
            </li>	
          ))}
        </ul>
				{list.length > 0 && <button className="flex items-center p-2 rounded-lg text-left bg-red-600 hover:bg-red-700 text-white cursor-pointer" onClick={() => setList([])}>
          <Trash2 size={18} className="mr-1 text-white" /> Delete All
        </button>}
      </div>
      </div>
    </>
  )
}

export default App
