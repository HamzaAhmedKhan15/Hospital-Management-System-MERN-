import React from "react";

const Hero = ({ imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner"><h1 className="maintitle" style={{ marginTop: "60px", color: "#22a826"}}>
  Welcome to <h1 className="maintitle" style={{ color: "#0F52BA" }}>MEDPULSE</h1> Your Trusted Healthcare Provider!
</h1>



          <p style={{fontSize:"21px"}}>
            MEDPULSE is a state-of-the-art facility dedicated
            to providing comprehensive healthcare services with compassion and
            expertise. Our team of skilled professionals is committed to
            delivering personalized care tailored to each patient's needs. At
            MEDPULSE, we prioritize your well-being, ensuring a harmonious
            journey towards optimal health and wellness.
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
          <img src="/Vector.png" alt="vector" style={{ filter: 'hue-rotate(284deg) saturate(1300%)' }} />


          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;
