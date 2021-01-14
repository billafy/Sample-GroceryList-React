import React, {useState} from 'react';
import {FaEdit, FaTrash} from 'react-icons/fa';
import Alert from './Alert';

const GroceryList = () => {
	const [id,setId] = useState(0);
	const [itemInput,setItemInput] = useState('');
	const [groceryItems,setGroceryItems] = useState([]);
	const [isEditing,setIsEditing] = useState(false);
	const [editId,setEditId] = useState(null);
	const [alert,setAlert] = useState(null);

	const changeItemInput = (event) => {
		setItemInput(event.target.value);
	}

	const showAlert = (color,title,message) => {
		setAlert({color,title,message});
		setTimeout(() => {
			setAlert(null);
		}, 3000);
	}

	const addItem = (event) => {
		if(!itemInput)
		{
			showAlert('error','Error','Empty input');
			return;
		}
		setGroceryItems([...groceryItems,{id,name:itemInput}]);
		setId(id+1);
		showAlert('success','Success','Added new item - '+itemInput);
		setItemInput('');
	}

	const initializeEdit = (id,name) => {
		setItemInput(name);
		setIsEditing(true);
		setEditId(id);
	}

	const editItem = () => {
		if(!itemInput)
		{
			showAlert('error','Error','Empty input');
			setIsEditing(false);
			return;
		}
		setGroceryItems(groceryItems.map(item => {
			if(item.id===editId)
				return {id:item.id,name:itemInput};
			return item;
		}));
		showAlert('success','Success','Edited item to - '+itemInput);
		setItemInput('');
		setIsEditing(false);
		setEditId(null);
	}

	const deleteItem = (id,name) => {
		showAlert('success','Success','Deleted item - '+name);
		setItemInput('');
		setIsEditing(false);
		const newGroceryItems = groceryItems.filter(item => item.id!==id);
		setGroceryItems(newGroceryItems);
	}

	return (
		<>
			<section className='container'>
				<h1 className='heading'>Grocery List</h1>
				<form className='form'>		
					<input type='text' name='itemInput' id='itemInput' 
						value={itemInput} onChange={changeItemInput}
						placeholder='eg.Rice'
					/>
					<button type='button' onClick={isEditing ? editItem : addItem}>{isEditing ? 'Edit Item' : 'Add Item'}</button>											
				</form>
				<div className='item-list'>
					{groceryItems.map((item) => {
							return (
								<div className='item' key={item.id}>
									<span>{item.name}</span>
									<button className='edit-btn' type='button' onClick={()=>initializeEdit(item.id,item.name)}><FaEdit/></button>
									<button className='del-btn' type='button' onClick={()=>deleteItem(item.id,item.name)}><FaTrash/></button>
								</div>	
							);
						})}					
				</div>
				<Alert {...alert}/>
				<button className='reset-btn' type='button' onClick={()=>setGroceryItems([])}>Clear All Items</button>
			</section>
		</>
	);
}

export default GroceryList;