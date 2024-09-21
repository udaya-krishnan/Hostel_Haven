import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHostel, fetchRoom, findwish } from "../../features/User/auth/authAction";
import {
  FaHeart,
  FaRegHeart,
  FaSearch,
  FaTimes,
  FaFilter,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import WishlistsIcon from "../../Layout/UserLayout/WishlistsIcon";
import { selectUser } from "../../features/User/auth/authSelectors";

function Hostellisting() {
  const [hostels, setHostels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [isHostelSelected, setIsHostelSelected] = useState(true); // State to track selection
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [itemsPerPage] = useState(8); // Items per page (adjust as needed)
  const navigate=useNavigate()
  const [wish,setWish]=useState([])
  const dispatch = useDispatch();
  const userData=useSelector(selectUser)

  useEffect(()=>{
    if(userData){
      const fetchwishlist=async()=>{
        const res=await dispatch(findwish(userData._id))
        console.log(res,"respomse");
        
        setWish(res.wish)
      }
      fetchwishlist()
    }
    
  },[])

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const clearSearch = () => {
    setSearchText("");
  };

  // Fetch either hostels or rooms based on the selected option
  useEffect(() => {
    const fetchData = async () => {
      if (isHostelSelected) {
        const response = await dispatch(fetchHostel());
        setHostels(response.hostels || []);
      } else {
        const response = await dispatch(fetchRoom());
        setRooms(response.rooms || []);
      }
    };
    fetchData();
  }, [dispatch, isHostelSelected]);

  // Filter hostels or rooms based on search text (name or location)
  const getFilteredItems = () => {
    const lowercasedSearchText = searchText.toLowerCase();

    const items = isHostelSelected ? hostels : rooms;

    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(lowercasedSearchText) ||
        item.location.toLowerCase().includes(lowercasedSearchText)
    );
  };

  // Calculate the items to display based on the current page
  const getCurrentItems = () => {
    const filteredItems = getFilteredItems();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredItems.slice(startIndex, endIndex);
  };

  // Calculate total pages based on the number of filtered items
  const totalPages = Math.ceil(getFilteredItems().length / itemsPerPage);

  // Change page handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto py-12">
      {/* Header: Navigation and Search */}
      <div className="flex justify-between items-center py-5 px-6 bg-white">
        {/* Navigation */}
        <div className="flex items-center space-x-8">
          <button
            className={`font-semibold ${
              isHostelSelected
                ? "text-[#3C3633] border-b-2 border-[#3C3633]"
                : "text-gray-500"
            }`}
            onClick={() => {
              setIsHostelSelected(true);
              setCurrentPage(1); // Reset to page 1 when switching
            }}
          >
            Hostels
          </button>
          <button
            className={`font-semibold ${
              !isHostelSelected
                ? "text-[#3C3633] border-b-2 border-[#3C3633]"
                : "text-gray-500"
            }`}
            onClick={() => {
              setIsHostelSelected(false);
              setCurrentPage(1); // Reset to page 1 when switching
            }}
          >
            Rooms
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center w-full max-w-lg bg-white rounded-full shadow-md px-4">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            className="flex-grow px-2 py-2 outline-none"
            placeholder="Search by name or location"
            value={searchText}
            onChange={handleSearchChange}
          />
          {searchText && (
            <button onClick={clearSearch}>
              <FaTimes className="text-gray-400" />
            </button>
          )}
        </div>

        {/* Filter Button */}
        <button className="flex items-center bg-white text-gray-500 px-4 py-2 rounded-full shadow-md">
          <FaFilter className="mr-2" />
          <span>Filters</span>
        </button>
      </div>

      {/* Listing: Hostels or Rooms */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
     
      >
        {getCurrentItems().map((item) => {
          const {
            image,
            regularPrice,
            offerPrice,
            location,
            _id,
            title,
            name,
          } = item;

          // Calculate discount if needed
          const discountPercentage = offerPrice
            ? Math.round(((regularPrice - offerPrice) / regularPrice) * 100)
            : null;

          return (
            <div key={_id} className="relative bg-white shadow-lg rounded-lg"
              
            >
              {/* Image Section */}
              <img
                src={image[0]}
                alt={title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {/* Heart Icon for Wishlist */}
              
              <WishlistsIcon proId={_id} wish={wish}/>
              {/* Content Section */}
              <div className="p-4"
              onClick={()=>navigate(`/propertydetails?propertyid=${_id}`)}>
                {/* Property Name */}
                <h3 className="font-bold text-lg text-[#3C3633]">{name}</h3>
                {/* Title */}
                <h3 className="font-semibold text-[#3C3633]">{title}</h3>
                {/* Prices */}
                {offerPrice ? (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-semibold text-[#3C3633] line-through">
                      ₹{regularPrice}
                    </span>
                    <span className="font-semibold text-red-500">
                      ₹{offerPrice}
                    </span>
                    {discountPercentage && (
                      <span className="text-green-600">
                        {discountPercentage}% off
                      </span>
                    )}
                  </div>
                ) : (
                  <h3 className="font-semibold text-[#3C3633]">
                    ₹{regularPrice}
                  </h3>
                )}
                {/* Location */}
                <p className="text-[#747264] mt-2">{location}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Section */}
      <div className="mt-12 flex justify-center">
        <ul className="flex space-x-2">
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`p-2 rounded-full cursor-pointer ${
                currentPage === index + 1 ? "bg-gray-300" : "bg-gray-200"
              }`}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Hostellisting;
