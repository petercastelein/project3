import React from 'react'
import {url} from "./constvars.js";

function EditItem({ editForm, handleItemUpdate, handleChange }) {
    let {inventory_id, inventory_name, inventory_quantity, price_per_quantity} = editForm

// PATCH request; calls handleCustomerUpdate to push changes to the page
    function handleEditForm(e) {
        e.preventDefault();
        try {
         const response = fetch(
            url + "updateInventory",
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(editForm)
            })
               .then(resp => resp.json())
               .then(handleItemUpdate(editForm))
        } catch (err) {
            console.err(err.message)
        }
    }

    return (
        <div>
            <h4>Edit Customer</h4>
            <form onSubmit={handleEditForm}>
                <input type="text" name="inventory_name" value={inventory_name} onChange={handleChange}/>
                <input type="text" name="inventory_quantity" value={inventory_quantity} onChange={handleChange}/>
                <input type="text" name="price_per_quantity" value={price_per_quantity} onChange={handleChange}/>
                <button type="submit">Submit Changes</button>
            </form>
        </div>
    )
}
export default EditItem