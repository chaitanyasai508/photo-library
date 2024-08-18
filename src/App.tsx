
import { useEffect, useState } from "react";
import "react-photo-album/rows.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Masonry from 'react-layout-masonry';

export default function App() {
  const [index, setIndex] = useState(-1);
  const [images, setImages] = useState([] as any);

  const loadAlbums = async (repo: string) => {
      fetch(`https://api.github.com/repos/chaitanyasai508/${repo}/contents/images/?ref=main`, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: 'Bearer '+ process.env.PASS_KEY,
        'X-GitHub-Api-Version': '2022-11-28'
      },
    })
    .then(resp => resp.json())
    .then((json:any) => {
      const images = json.map(({download_url}:any) => ({src: download_url}))
      console.log(json);
      setImages(images)
    })
  };

  useEffect(() => {
    // const token = window.prompt("Enter password");
    // if(token){
      loadAlbums('ved-newborn-shoot');
    // }
  }, [])


  return (
    <>
      <Masonry columns={3} gap={10} >
          {images.map((i:any, index:any) => <img src={i.src} style={{width: "100%", display: "block", borderRadius: 10}} onClick={() => setIndex(index)}></img>)}
      </Masonry>
      <Lightbox
        slides={images}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </>
  );
}