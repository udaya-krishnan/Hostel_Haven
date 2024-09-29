import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../features/User/auth/authSelectors';
import {useNavigate} from 'react-router-dom'
import {fetchWishlist, removewish} from '../../features/User/auth/authAction'
const Wishlist = () => {

    const userData=useSelector(selectUser)
    const [wishlist,setWishlists]=useState([])
    const dispatch=useDispatch()   
    const navigate=useNavigate()

    useEffect(()=>{

        const fetchWish=async()=>{
           const res=await dispatch(fetchWishlist(userData._id))
           console.log(res.payload.wishlist,"whssskdjsdjf");
           
            setWishlists(res.payload.wishlist)
        }

        fetchWish()

    },[userData])


   async function removeWish(id){
    const res=await dispatch(removewish({id:id,userId:userData._id}))
    setWishlists(res.payload.wishlist)
    }

    if(wishlist.length===0){
      return(
        <div className="p-8">
           <h2 className="text-2xl text-btncolor font-bold mb-6">Wishlists</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <h1>Wishlist empty</h1>
           </div>
        </div>
      )
    }

  

  return (
    <div className="p-8">
      <h2 className="text-2xl text-btncolor font-bold mb-6">Wishlists</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((wishlist) => (
          <div key={wishlist.propertyId._id} className="relative group"
         
          >
            <img
              src={wishlist.propertyId.image[0]}
              alt={wishlist.propertyId.name}
              className="rounded-lg w-full h-64 object-cover"
            />
            <button className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={()=>removeWish(wishlist._id)}>
              &times;
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 rounded-b-lg"
             onClick={()=>navigate(`/propertydetails?propertyid=${wishlist.propertyId._id}`)}>
              <h3 className="text-white text-xl font-semibold">{wishlist.propertyId.name}</h3>
              <p className="text-white">{wishlist.propertyId.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
