import useFetch from "../../hooks/useFetch";
import "./FeaturedProperty.css";

const FeaturedProperty = () => {
  const { data, loading, error } = useFetch("/hotels/featured?featured=true&limit=4"); // limit=4, only 4 hotels will be displayed

  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img
                src={item.photos[0]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from ₹ {item.cheapestPrice}</span>
              
              {/* if there is rating show this div */}
              {item.rating && <div className="fpRating">
                <button>{item.rating}</button>
                <span>Excellent</span>
              </div>}
              
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperty;