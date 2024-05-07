import { FC } from "react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import styles from "./player.module.scss";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import { Poster } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

interface PlayerProps {
  poster: string;
}

const Player: FC<PlayerProps> = ({ poster }) => {
  return (
    <div className={styles.player}>
      <MediaPlayer
        title="Sprite Fight"
        src="https://files.vidstack.io/sprite-fight/720p.mp4"
      >
        <MediaProvider>
          <Poster
            className="vds-poster"
            src={poster}
            alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
          />
        </MediaProvider>
        <DefaultVideoLayout
          thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
          icons={defaultLayoutIcons}
        />
      </MediaPlayer>
    </div>
  );
};

export default Player;
