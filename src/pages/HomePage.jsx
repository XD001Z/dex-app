import Searchbar from "../components/SearchBar";
import { useAuthContext } from "../hooks/useAuthContext";
import AnimeCard from "../components/AnimeCard";

const HomePage = () => {
  const { user } = useAuthContext();
  return user && (
    <div className="container">
      <Searchbar />
      <div className="main-div">
        <h3 className="main-header">Captured</h3>
        <div className="main-grid">
          {
          user.registered.map((anime, index) => {
              const { img, _id, dexNum } = anime;
              return <AnimeCard key={index} img={img} _id={_id} dexNum={dexNum}/>
            })
          }
        </div>
      </div>
      <br />
    </div>
  )
}

export default HomePage;