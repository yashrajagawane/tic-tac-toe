import { Howl } from "howler";
import { useEffect, useMemo, useRef } from "react";

// Free CDN sound effects (small ogg/mp3 files)
const SOUND_URLS = {
  click: [
    "https://cdn.jsdelivr.net/gh/naptha/tesseract.js@master/tests/wav/test.wav",
  ],
  place: [
    "https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3",
  ],
  win: [
    "https://assets.mixkit.co/active_storage/sfx/1997/1997-preview.mp3",
  ],
  draw: [
    "https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3",
  ],
  hover: [
    "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3",
  ],
};

export function useSound(enabled = true, volume = 0.5) {
  const soundsRef = useRef({});

  useEffect(() => {
    // Build sounds lazily
    Object.entries(SOUND_URLS).forEach(([key, srcs]) => {
      if (!soundsRef.current[key]) {
        soundsRef.current[key] = new Howl({
          src: srcs,
          volume,
          html5: true,
          preload: true,
        });
      } else {
        soundsRef.current[key].volume(volume);
      }
    });
    return () => {};
  }, [volume]);

  const api = useMemo(
    () => ({
      play(name) {
        if (!enabled) return;
        const s = soundsRef.current[name];
        if (s) {
          try {
            s.play();
          } catch {
            /* ignore */
          }
        }
      },
    }),
    [enabled],
  );

  return api;
}
