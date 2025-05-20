import React from 'react'
import Header from '../../../Shared/components/Header/Header'
import headerImg from '../../../../assets/images/header.png'

export default function Dashboard() {
  return (
    <>

     <Header imgPath={headerImg} title={'Welcome'} description={'This is a welcoming screen for the entry of the application , you can now see the options'}/>
    </>
  )
}
