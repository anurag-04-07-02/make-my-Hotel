import {
  faBed,
  faCalendarDays,
  faCar,
  faHotel,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";



const Header = ({type}) => {

  const [destination, setDestination] = useState("");

  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]); // react date-range library syntax .

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const navigate = useNavigate();
  
  const { user } = useContext(AuthContext);

  const {dispatch} = useContext(SearchContext)

  const handleSearch = ()=>{
    dispatch({type:"NEW_SEARCH",payload:{destination,dates,options} });
    navigate("/hotels",{state: {destination,dates,options} } );
  }

  return (
    <div className="header">
      <div className = { type === "list" ? "headerContainer listMode" : "headerContainer" } >
        <div className="headerList">

          <div className="headerListItem active">
            <FontAwesomeIcon icon={faHotel} />
            <span>Stays</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car Rentals</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>

          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport Taxis</span>
          </div>

        </div>

        { type!=="list" && ( 
        
        <>
        <h1>A lifetime of discounts? Its Genius.</h1>
        <p className="headerDesc">
          Get rewarded for your travels – unlock instant savings of 10% or more
          with a free <span>make-my-Hotel</span> account
        </p>

        {!user && <Link to="/register"><button className="headerBtn">Sign in / Register</button></Link>}

        <div className="headerSearch">

          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faBed} className="headerIcon" />
            
            <input
              type="text"
              placeholder="Where are you going ?"
              className="headerSearchInput"
              onChange={(e)=>setDestination(e.target.value)}
            />

          </div>


          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />

            <span
              onClick={() => setOpenDate(!openDate)}
              className="headerSearchText"
            >{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
              dates[0].endDate,
              "dd/MM/yyyy"
            )}`}</span>

            {openDate && (
              <DateRange // date range syntax for the calendar
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                minDate={new Date()}
                ranges={dates}
                className="date"
              />
            )}

          </div>

          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faPerson} className="headerIcon" />

            <span
              onClick={() => setOpenOptions(!openOptions)}
              className="headerSearchText"
            >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>

            {openOptions && (
              <div className="options">
                

                {/* ADULT */}
                <div className="optionItem">
                  <span className="optionText">Adult</span>
                  <div className="optionCounter">
                    
                    <button
                      disabled={options.adult <= 1}
                      className="optionCounterButton"
                      onClick={() => handleOption("adult", "d")}
                    >
                      -
                    </button>

                    <span className="optionCounterNumber">{options.adult}</span>
                    
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("adult", "i")}
                    >
                      +
                    </button>

                  </div>
                </div>

                
                {/* CHILDREN */}
                <div className="optionItem">
                  <span className="optionText">Children</span>
                  <div className="optionCounter">
                    <button
                      disabled={options.children <= 0}
                      className="optionCounterButton"
                      onClick={() => handleOption("children", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">
                      {options.children}
                    </span>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("children", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* ROOM */}
                <div className="optionItem">
                  <span className="optionText">Room</span>
                  <div className="optionCounter">
                    <button
                      disabled={options.room <= 1}
                      className="optionCounterButton"
                      onClick={() => handleOption("room", "d")}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">{options.room}</span>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("room", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>

          <div className="headerSearchItem">
            <button className="headerBtn" onClick={handleSearch}>Search</button>
          </div>

        </div>
        
        </>)}

      </div>
    </div>
  );
};

export default Header;
