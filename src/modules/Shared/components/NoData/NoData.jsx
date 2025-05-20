import React from 'react'
import  noDataImg from '../../../../assets/images/nodataimg.png'
export default function NoData() {
  return (
    <div className='text-center'>
       <img src={noDataImg} alt="" />
       <h4>No Data!</h4>
    </div>
  )
}
