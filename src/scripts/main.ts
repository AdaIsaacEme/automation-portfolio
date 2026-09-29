import { initChrome } from "./chrome";
import { initMenu } from "./menu";
import { initLightbox } from "./lightbox";
import { initVideo } from "./video";
import { state } from "./state";

const root = document.documentElement;

initChrome();
initMenu();
initLightbox();
initVideo();

if (state.motion) {
  import("./motion")
    .then((m) => m.initMotion())
    .catch((err) => {
      // Never leave content hidden because an animation failed.
      console.error(err);
      state.motion = false;
      root.classList.remove("motion", "is-loading");
    });
}
