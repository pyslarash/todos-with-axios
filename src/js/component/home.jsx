import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

//create your first component

const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [toDos, setToDos] = useState([{ label: "", done: false }]);
	const showTrash = useRef([]);

	const createUser = async () => {
		try {
		  const response = await axios.post(
			'https://assets.breatheco.de/apis/fake/todos/user/pyslarash',
			[],
			{ headers: { 'Content-Type': 'application/json' } }
		  );
		  console.log(response.data);
		} catch (error) {
		  console.log(error);
		  if (error.response && error.response.status === 400) {
			alert("User already exists!")
		}
		}
	  };

	const viewList = async () => {
		try {
			const response = await axios.get(
				'https://assets.breatheco.de/apis/fake/todos/user/pyslarash',
				{
				  headers: {
					'Content-Type': 'application/json',
				  },
				}
			  );
			  const items = response.data;
			  setToDos(items);
			  console.log(toDos);
			} catch (error) {
				console.log(error);
				if (error.response && error.response.status === 404) {
					alert("You need to create the user first!")
				}			  	
			}
		}

	const handleUpdate = async (newToDos) => {
		try {
		  await axios.put(
			'https://assets.breatheco.de/apis/fake/todos/user/pyslarash',
			newToDos,
			{ headers: { 'Content-Type': 'application/json' } }
		  );
		  setToDos(newToDos); // Update the API and local state
		} catch (error) {
		  console.log(error);
		  if (error.response && error.response.status === 404) {
			alert("User doesn't exist!")
		}
		}
	};

	const deleteUser = async () => {
		try {
		  await axios.delete(
			'https://assets.breatheco.de/apis/fake/todos/user/pyslarash',
			{ headers: { 'Content-Type': 'application/json' } }
		  );
		} catch (error) {
		  console.error(error);
		}
	};
	

	// Creating a function that will return a message that no tasks were entered.
	function NoTasks () {
		return(<div className="notasks">No Tasks Yet. Please, add a task. 👆</div>)
	};
	
	// Returning the results	
	return (
		<div className="container">
		  <h1>My To-Do List</h1>
		  <h2>Now With API!</h2>
		  <ul>
			<li>
			  <input 
				onChange={(e) => setInputValue(e.target.value)}
				value={inputValue}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						// Input validation
						if (inputValue === "") {alert("You need to enter something ⚠️")}
						else {
						// Entering input
						setToDos([...toDos, {label: inputValue, done: false}]);
						// Eracing the value in the field after it's been entered
						setInputValue("");}
					}}}
			  />
			</li>
			{toDos.map((item, index) => (
				// Displaying the value into the list
				
				<li className="theitem"
					/* Utilizing the hover function with useRef */
					onMouseEnter={() => showTrash.current[index].style.display="inline-block"}
					onMouseLeave={() => showTrash.current[index].style.display="none"}
					key={index}
				>
					<span className="thetask">{item.label}</span>
					<span className="thetrash">
						<FontAwesomeIcon
						/* Applying the hover function with useRef */
						ref={elementShow => showTrash.current[index] = elementShow}
						style={{display: "none"}}					
						className="trashcant" icon={faTrash} onClick={() => setToDos(toDos.filter((item, currentIndex) => index != currentIndex ))} />
					</span>
				</li>))}
		  </ul>
		{/* Checking if there are any tasks */}
			{(toDos.length === 0) ? <NoTasks /> : ""}
		  <button className="thebutton" onClick={() => createUser()}>Create User</button>
		  <button className="thebutton" onClick={() => viewList()}>View List</button>  
		  <button className="thebutton" onClick={() => handleUpdate(toDos)}>Save List</button>  
		  <button className="thebutton" onClick={() => deleteUser()}>Delete All</button>
		
		{/* Counting tasks */}
			<div className="counter">
				{toDos.length} {(toDos.length%100 !== 11 && toDos.length % 10 === 1) ? "Task" : "Tasks"}
			</div>
		</div>
	  );
};

export default Home;
