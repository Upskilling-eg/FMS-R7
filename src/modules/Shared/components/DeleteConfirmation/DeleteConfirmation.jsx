import React from 'react'
import  noDataImg from '../../../../assets/images/nodataimg.png'

export default function DeleteConfirmation({deleteItem}) {
  return (
    <div className='text-center'>
             <img src={noDataImg} alt="" />
             <h6 className='my-3'>Delete this {deleteItem} ?</h6>
             <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
    </div>
  )
}
