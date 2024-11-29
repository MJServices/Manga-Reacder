import BgVideo from "./BgVideo";
import Hero from "./Hero";
import Navbar from "./Navbar";

const LandingPage = () => {
  return (
    <section className="w-screen h-[100svh] overflow-hidden">
      <BgVideo />
      <section className="relative z-[2] w-screen h-screen overflow-hidden">
        <Navbar/>
        <Hero/>
      </section>
    </section>
  );
};
export default LandingPage;
