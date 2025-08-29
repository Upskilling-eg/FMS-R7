import React, { useContext, useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/images/3.png'
import { AuthContext } from '../../../../context/AuthContext';

export default function SideBar() {
  let {loginData} = useContext(AuthContext);
  
  const [isCollapsable, setIsCollapsable] = useState(false);
  let toggleCollapse = () =>{
    setIsCollapsable(!isCollapsable)
  }
  return (
   <>
   <div className="sidebar-cont">
   <Sidebar collapsed={isCollapsable}>
  <Menu>
    <MenuItem onClick={toggleCollapse} className='my-5 sidebar-logo'><img src={logo} alt="" /></MenuItem>
    <MenuItem icon={<i class="fa fa-home" aria-hidden="true"></i>} component={<Link to="/dashboard" />}> Home </MenuItem>
    {loginData?.userGroup !="SystemUser"? <MenuItem  icon={<i class="fa fa-users" aria-hidden="true"></i>} component={<Link to="/dashboard/users" />}> Users </MenuItem>:''}

    <MenuItem icon={<i class="fa fa-users" aria-hidden="true"></i>} component={<Link to="/dashboard/recipes" />}> Recipes </MenuItem>
     {loginData?.userGroup !="SystemUser"? <MenuItem icon={<i class="fa fa-users" aria-hidden="true"></i>} component={<Link to="/dashboard/categories" />}> Categories </MenuItem>:''}
     {loginData?.userGroup =="SystemUser"? <MenuItem icon={<i class="fa fa-users" aria-hidden="true"></i>} component={<Link to="/dashboard/favs" />}> Fav. </MenuItem> :''}

    <MenuItem icon={<i class="fa fa-users" aria-hidden="true"></i>}> Change Password </MenuItem>
    <MenuItem icon={<i class="fa fa-users" aria-hidden="true"></i>}> Logout </MenuItem>

  </Menu>
</Sidebar>;
   </div>
   
   </>
  )
}
