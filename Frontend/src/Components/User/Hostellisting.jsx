import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHostel,
  fetchRoom,
  findwish,
} from "../../features/User/auth/authAction";
import {
  FaHeart,
  FaRegHeart,
  FaSearch,
  FaTimes,
  FaFilter,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import WishlistsIcon from "../../Layout/UserLayout/WishlistsIcon";
import { selectUser } from "../../features/User/auth/authSelectors";
import FilterSidebar from "./../../Layout/UserLayout/FilterModal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import debounce from "lodash.debounce"; // Import debounce

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
  const [sortOption, setSortOption] = useState("default"); // State for sorting option
  const userData = useSelector(selectUser);
  const location = useLocation();

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
    debouncedSearch(e.target.value); // Use the debounced search function
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

  // Sorting function
  // Sorting function
  const sortItems = (items) => {
    switch (sortOption) {
      case "priceAsc":
        return items.sort(
          (a, b) =>
            (a.offerPrice || a.regularPrice) - (b.offerPrice || b.regularPrice)
        );
      case "priceDesc":
        return items.sort(
          (a, b) =>
            (b.offerPrice || b.regularPrice) - (a.offerPrice || a.regularPrice)
        );
      case "nameAsc":
        return items.sort((a, b) => a.name.localeCompare(b.name));
      case "nameDesc":
        return items.sort((a, b) => b.name.localeCompare(a.name));
      case "ratingDesc": // Sort by rating from highest to lowest
        return items.sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0));
      case "ratingAsc": // Sort by rating from lowest to highest
        return items.sort((a, b) => (a.avgRating || 0) - (b.avgRating || 0));
      default:
        return items;
    }
  };

  const getFilteredItems = () => {
    const lowercasedSearchText = searchText.toLowerCase();
    const items = isHostelSelected ? hostels : rooms;

    const filteredItems = items
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

    return sortItems(filteredItems); // Sort filtered items
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
    <div className="container mx-auto px-4 py-6 md:py-12">
      {/* Header: Navigation and Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-3 md:py-5 px-3 md:px-6 bg-white">
        <div className="flex items-center space-x-4 md:space-x-8 w-full md:w-auto">
          <button
            className={`font-semibold text-sm md:text-base ${
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
            className={`font-semibold text-sm md:text-base ${
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
        <div className="flex items-center w-full md:max-w-lg bg-white rounded-full shadow-md px-4">
          <FaSearch className="text-gray-400 text-sm md:text-base" />

          <input
            type="text"
            className="flex-grow px-2 py-2 text-sm md:text-base outline-none w-full"
            placeholder="Search by name or location"
            onChange={handleSearchChange}
          />
          {searchText && (
            <button onClick={clearSearch}>
              <FaTimes className="text-gray-400" />
            </button>
          )}
        </div>

        {/* Sort Option - Keep this section compact and without changing layout */}
        <div className="flex justify-end items-center gap-4 mb-4">

        <select
            className="border rounded px-2 py-1 text-sm md:text-base bg-white"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Sort by</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="nameAsc">Name: A to Z</option>
            <option value="nameDesc">Name: Z to A</option>
            <option value="ratingDesc">Rating: High to Low</option>{" "}
            {/* New option */}
            <option value="ratingAsc">Rating: Low to High</option>{" "}
            {/* New option */}
          </select>
        </div>

        <button
            className="flex items-center text-gray-600 space-x-2 text-sm md:text-base bg-white px-3 py-1 rounded border"
            onClick={() => setShowFilterSidebar(true)}
          >
            <FaFilter />
            <span className="hidden md:inline">Filters</span>
          </button>
      </div>

      {/* Filter Sidebar */}
      <FilterSidebar
        show={showFilterSidebar}
        onClose={() => setShowFilterSidebar(false)}
        onApplyFilters={handleApplyFilters}
      />

      {/* Listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mt-6">

        {isLoading
          ? [...Array(8)].map((_, index) => (
              <div
                key={index}
                className="relative bg-white shadow-lg rounded-lg"
              >
                <Skeleton
                  height={192}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <Skeleton height={20} width="60%" />
                  <Skeleton height={20} width="80%" />
                  <Skeleton height={20} width="40%" />
                </div>
              </div>
            ))
          : getCurrentItems().map((item) => {
              const {
                image,
                regularPrice,
                offerPrice,
                location,
                _id,
                title,
                name,
                avgRating
              } = item;

              const discountPercentage = offerPrice
                ? Math.round(((regularPrice - offerPrice) / regularPrice) * 100)
                : null;

              return (
                <div
                  key={_id}
                  className="relative bg-white shadow-lg rounded-lg"
                >
                  <img
                    src={image[0]}
                    alt={title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <WishlistsIcon proId={_id} wish={wish} />
                  <div
                    className="p-4"
                    onClick={() =>
                      navigate(`/propertydetails?propertyid=${_id}`)
                    }
                  >
                  <h3 className="font-bold text-base md:text-lg text-[#3C3633] line-clamp-1">{name}</h3>
                  <h3 className="font-semibold text-sm md:text-base text-[#3C3633] line-clamp-1">{title}</h3>
                    {avgRating && (
                       <div className="text-xs md:text-sm text-yellow-500">
                        Rating: {avgRating.toFixed()} ⭐
                      </div> // Display the rating
                    )}
                    {offerPrice ? (
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[#3C3633] text-base md:text-lg font-bold">
                          ₹{offerPrice}
                        </span>
                        <span className="line-through text-red-500 text-sm">
                          ₹{regularPrice}
                        </span>
                        <span className="text-xs md:text-sm text-green-600">
                          {discountPercentage}% off
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-[#3C3633] text-base md:text-lg font-bold">
                          ₹{regularPrice}
                        </span>
                      </div>
                    )}
                 <div className="text-xs md:text-sm text-gray-500 line-clamp-1">{location}
                 </div>
                  </div>
                </div>
              );
            })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-2 md:px-3 py-1 rounded text-sm md:text-base ${
              currentPage === index + 1
                ? "bg-[#3C3633] text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Hostellisting;
