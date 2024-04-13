import React from "react";
import medpulse from "/Medpulse.jpg"

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography" style={{marginTop:"-50px"}}>
        <div className="banner">
          <img src={medpulse} alt="whoweare" />
        </div>
        <div className="banner">
          <h6>Biography</h6>
          <h2 style={{color: "#0F52BA" }} className="maintitle">Who We Are?</h2>
          <p>
          MEDPULSE stands as a beacon of healthcare excellence. Our state-of-the-art facility boasts cutting-edge medical technology, ensuring accurate diagnoses and effective treatments. From routine check-ups to complex surgical procedures, our multidisciplinary team is equipped to address a wide range of medical concerns. With a focus on innovation and research, we continually strive to push the boundaries of medical advancement, offering our patients access to the latest breakthroughs in healthcare.
          </p>
          <p>
          You can trust MEDPULSE to deliver exceptional care tailored to your individual needs. Your health and well-being are our top priorities, and we are honored to be your trusted healthcare provider.
          </p>
        </div>
      </div>
    </>
  );
};

export default Biography;
