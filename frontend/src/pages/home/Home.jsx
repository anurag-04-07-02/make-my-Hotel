import Navbar from "../../Components/navbar/Navbar"
import Featured from "../../Components/featured/Featured"
import Header from "../../Components/header/Header"
import PropertyList from "../../Components/propertyList/PropertyList"
import FeaturedProperty from "../../Components/featuredProperty/FeaturedProperty"
import MailList from "../../Components/mailList/MailList"
import Footer from "../../Components/footer/Footer"
import "./Home.css"

const Home = () => {
  return (
    <div>
      
      <Navbar/>
      <Header/>
      
      <div className="homeContainer">
        
        <Featured/>
        
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList/>
        
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperty/>
        
        <MailList/>
        <Footer/>

      </div>

    </div>
  )
}

export default Home