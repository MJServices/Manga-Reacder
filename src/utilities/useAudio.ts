import { Howl } from "howler";

const useAudio = (src: string) => {
  const playSound = () => {
    const sound = new Howl({
      src: [src],
      loop: false,
    });
    sound.play();
  };

  return { playSound };
};

export default useAudio;
