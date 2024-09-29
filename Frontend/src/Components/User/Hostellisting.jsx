import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHostel, fetchRoom, findwish } from "../../features/User/auth/authAction";
import { FaHeart, FaRegHeart, FaSearch, FaTimes, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import WishlistsIcon from "../../Layout/UserLayout/WishlistsIcon";
import { selectUser } from "../../features/User/auth/authSelectors";
import FilterSidebar from "./../../Layout/UserLayout/FilterModal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import debounce from "lodash.debounce";  // Import debounce

function Hostellisting() {
  const [hostels, setHostels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [isHostelSelected, setIsHostelSelected] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [wish, setWish] = useState([]);
  const dispatch = useDispatch();
  const [appliedFilters, setAppliedFilters] = useState({});
  const userData = useSelector(selectUser);

  // Debounced search function using lodash
  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchText(value);
    }, 500),
    []
  );

  useEffect(() => {
    if (userData) {
      const fetchwishlist = async () => {
        const res = await dispatch(findwish(userData._id));
        console.log(res, "wishlist data");
        setWish(res.payload.wish);
      };
      fetchwishlist();
    }
  }, [userData, dispatch]);

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);  // Use the debounced search function
  };

  const clearSearch = () => {
    setSearchText("");
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const searchParam = searchText.trim();
      if (isHostelSelected) {
        const response = await dispatch(fetchHostel({ search: searchParam }));
        setHostels(response.payload.hostels || []);
      } else {
        const response = await dispatch(fetchRoom({ search: searchParam }));
        setRooms(response.payload.rooms || []);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    fetchData();
  }, [dispatch, isHostelSelected, searchText]);

  const getFilteredItems = () => {
    const lowercasedSearchText = searchText.toLowerCase();
    const items = isHostelSelected ? hostels : rooms;

    return items
      .filter(
        (item) =>
          item.name.toLowerCase().includes(lowercasedSearchText) ||
          item.location.toLowerCase().includes(lowercasedSearchText)
      )
      .filter((item) => {
        const { propertyType, priceRange, gender, amenities } = appliedFilters;
        let passesFilter = true;

        if (propertyType && propertyType !== item.type) {
          passesFilter = false;
        }

        const priceToCompare = item.offerPrice || item.regularPrice;

        if (priceRange?.min && priceToCompare < priceRange.min) {
          passesFilter = false;
        }
        if (priceRange?.max && priceToCompare > priceRange.max) {
          passesFilter = false;
        }

        if (gender && gender !== item.forwhom) {
          passesFilter = false;
        }

        if (amenities && amenities.length > 0) {
          const itemAmenities = item.amenities || [];
          if (!amenities.every((amenity) => itemAmenities.includes(amenity))) {
            passesFilter = false;
          }
        }

        return passesFilter;
      });
  };

  const getCurrentItems = () => {
    const filteredItems = getFilteredItems();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredItems.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(getFilteredItems().length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
  };

  return (
    <div className="container mx-auto py-12">
      {/* Header: Navigation and Search */}
      <div className="flex justify-between items-center py-5 px-6 bg-white">
        <div className="flex items-center space-x-8">
          <button
            className={`font-semibold ${
              isHostelSelected
                ? "text-[#3C3633] border-b-2 border-[#3C3633]"
                : "text-gray-500"
            }`}
            onClick={() => {
              setIsHostelSelected(true);
              setCurrentPage(1);
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
              setCurrentPage(1);
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
            onChange={handleSearchChange}
          />
          {searchText && (
            <button onClick={clearSearch}>
              <FaTimes className="text-gray-400" />
            </button>
          )}
        </div>

        <button
          className="flex items-center text-gray-600 space-x-2"
          onClick={() => setShowFilterSidebar(true)}
        >
          <FaFilter />
          <span>Filters</span>
        </button>
      </div>

      {/* Filter Sidebar */}
      <FilterSidebar
        show={showFilterSidebar}
        onClose={() => setShowFilterSidebar(false)}
        onApplyFilters={handleApplyFilters}
      />

      {/* Listing */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {isLoading ? (
          [...Array(8)].map((_, index) => (
            <div key={index} className="relative bg-white shadow-lg rounded-lg">
              <Skeleton height={192} className="w-full h-48 object-cover rounded-t-lg" />
              <div className="p-4">
                <Skeleton height={20} width="60%" />
                <Skeleton height={20} width="80%" />
                <Skeleton height={20} width="40%" />
                <Skeleton height={20} width="50%" />
              </div>
            </div>
          ))
        ) : (
          getCurrentItems().map((item) => {
            const {
              image,
              regularPrice,
              offerPrice,
              location,
              _id,
              title,
              name,
            } = item;

            const discountPercentage = offerPrice
              ? Math.round(((regularPrice - offerPrice) / regularPrice) * 100)
              : null;

            return (
              <div key={_id} className="relative bg-white shadow-lg rounded-lg">
                <img
                  src={image[0]}
                  alt={title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <WishlistsIcon proId={_id} wish={wish} />
                <div className="p-4" onClick={() => navigate(`/propertydetails?propertyid=${_id}`)}>
                  <h3 className="font-bold text-lg text-[#3C3633]">{name}</h3>
                  <h3 className="font-semibold text-[#3C3633]">{title}</h3>
                  {offerPrice ? (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[#3C3633] text-lg font-bold">
                        ₹{offerPrice}
                      </span>
                      <span className="line-through text-red-500">₹{regularPrice}</span>
                      <span className="text-sm text-green-600">
                        {discountPercentage}% off
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[#3C3633] text-lg font-bold">
                        ₹{regularPrice}
                      </span>
                    </div>
                  )}
                  <div className="text-sm text-gray-500">{location}</div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`mx-1 px-4 py-2 rounded ${
                currentPage === i + 1
                  ? "bg-[#3C3633] text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Hostellisting;
