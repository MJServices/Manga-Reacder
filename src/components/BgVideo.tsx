function BgVideo() {
    return (
      <section>
      <div style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }} className="w-screen h-screen absolute top-0 left-0 z-[1]"></div>
      <section>
        <video autoPlay muted loop className="w-[100vw] h-[100vh] object-cover absolute">
          <source
            src="/videos/bgvideo.mp4"
          />
          Your browser does not support the video tag.
        </video>
      </section>
      </section>
    )
  }
  export default BgVideo