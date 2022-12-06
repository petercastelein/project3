// InvenItem.js
import React from 'react'

// deconstructed props
function InvenItem({invenItem, invenItem:{inventory_id, inventory_name, inventory_quantity, price_per_quantity}, captureEdit, changeEditState}) {

  return (
        <tr key={inventory_id}>
            <td>{inventory_id}</td>
            <td>{inventory_name}</td>
            <td>{inventory_quantity}</td>
            <td>{price_per_quantity}</td>
            <td>
               <button className="btn btn-danger btn-dark"
                  onClick={() => {
                     captureEdit(invenItem);
                     changeEditState(invenItem)
                  }}
               >Edit
               </button>
            </td>
        </tr>
  )
}
export default InvenItem