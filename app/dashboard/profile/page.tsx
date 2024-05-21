import { getCurrentUser } from '@/actions/users/currentUser';
import React from 'react'
import ProfileClient from './profileClient';

const ProfilePage = async() => {
  const user=await getCurrentUser();

  if(!user) {
    return null;
  }
  return ( <>
  <div className="w-full py-20 flex justify-center items-center">
    <ProfileClient user={user}/>
  </div></> );
}

export default ProfilePage