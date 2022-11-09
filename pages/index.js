import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import Banner from "../src/components/Banner";
import FavoriteList from "../src/components/FavoriteList";


const HomePage = () => {
    const estilosDaHomePage = {
        display: "flex",
        flexDirection: "column",
        flex: 1,
    };

    const [valorDoFiltro, setValorDoFiltro] = React.useState("");

    return (
        <>
            <div style={estilosDaHomePage}>
                {/* Prop Drilling */}
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Banner imgSrc={config.bannerImgSrc} />
                <Header />
                <Timeline searchValue={valorDoFiltro} playlists={config.playlists} />
                <FavoriteList favorites={config.favorites}></FavoriteList>
            </div>
        </>
    );
}

export default HomePage;

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    margin-top: 10px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

const Header = (props) => {
    return (
        <StyledHeader>
            <section className="user-info">
                <img src={`http://github.com/${config.github}.png`} />
                <div>
                    <h2>{config.name}</h2>
                    <p>{config.job}</p>
                </div>
            </section>
        </StyledHeader>
    );
};

function Timeline({ searchValue, ...props }) {
    // The Object.keys() method returns an array of a given object's own enumerable property names,
    // iterated in the same order that a normal loop would.
    const playlistNames = Object.keys(props.playlists);

    // You can't use statements in React like if/for inside JSX
    // So to use Conditional Rendering you should use:
    // 1) Element Variables: variables to store elements
    // 2) Inline If with Logical && Operator: true && expression / false && expression
    // 3) Inline If-Else with Conditional Operator: condition ? true : false
    // 4) Preventing Component from Rendering: return null instead of its render output
    // https://reactjs.org/docs/conditional-rendering.html
    // The thing you use the most in React is the .map() function to transform from an object to another
    return (
        <StyledTimeline>
        {playlistNames.map((playlistName) => {
            const videos = props.playlists[playlistName];
            // console.log(playlistName);
            // console.log(videos);
            return (
                <section key={playlistName}>
                    <h2>{playlistName}</h2>
                    <div>
                        {videos
                            .filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized)
                            })
                            .map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                    </div>
                </section>
            )
        })}
    </StyledTimeline>
)
}