// InvenItems.js
import React, { useEffect, useState } from "react";
import InvenItem from './InvenItem'
import EditItem from './EditItem'

function InvenItems({invenItems, onUpdateItem}) {
   // state for conditional render of edit form
  const [isEditing, setIsEditing] = useState(false);
  // state for edit form inputs
    const [editForm, setEditForm] = useState({
      inventory_id: "",
      inventory_name: "",
      inventory_quantity: "",
      price_per_quantity: ""
    })

// when PATCH request happens; auto-hides the form, pushes changes to display
function handleItemUpdate(updatedItem) {
   setIsEditing(false);
   //console.log("here");
   //console.log(updatedItem);
   onUpdateItem(updatedItem);
 }

// capture user input in edit form inputs
function handleChange(e) {
 setEditForm({
 ...editForm,
 [e.target.name]: e.target.value
 })
}

// needed logic for conditional rendering of the form - shows the customer you want when you want them, and hides it when you don't
function changeEditState(invenItem) {
 if (invenItem.inventory_id === editForm.inventory_id) {
   setIsEditing(isEditing => !isEditing) // hides the form
 } else if (isEditing === false) {
   setIsEditing(isEditing => !isEditing) // shows the form
 }
}

// capture the customer you wish to edit, set to state
function captureEdit(clickedItem) {
 let filtered = invenItems.filter(invenItem => invenItem.inventory_id === clickedItem.inventory_id)
 setEditForm(filtered[0])
}

  return (
   <div>
   {isEditing?
     (<EditItem
       editForm={editForm}
       handleChange={handleChange}
       handleItemUpdate={handleItemUpdate}
     />) : null}
        <table className="table employeeElements" id="test1">
          <thead>
            <tr>
               <th>ID</th>
               <th>Name</th>
               <th>Quantity</th>
               <th>Price per Quantity</th>
               <th></th>
            </tr>
          </thead>
          <tbody>
            {/* iterate through the customers array and render a unique Customer component for each customer object in the array */}
            {invenItems.map((invenItem) => 
               <InvenItem 
                  key={invenItems.inventory_id}
                  invenItem={invenItem}
                  captureEdit={captureEdit}
                  changeEditState={changeEditState} 
               />) }
          </tbody>
        </table>
      </div>
  )
}

export default InvenItems