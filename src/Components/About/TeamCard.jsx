import React from "react";
import { AboutUsData } from "../../Data/AboutUs";

function TeamCard() {
  return (
    <section className="team-section">
      <div className="container">
        <div className="text-center team-heading">
          <span className="eyebrow">The people behind every plate</span>
          <h2 className="section-heading">Meet our team</h2>
          <p className="section-intro">A small team with a big appetite for making good food feel special.</p>
        </div>
        <div className="team-grid">
          {AboutUsData.map((person, index) => (
            <article className={`team-member-card team-member-card-${index % 4}`} key={person.id}>
              <div className="team-member-avatar" aria-hidden="true">
                <span>{person.developerName.split(" ").map((part) => part[0]).join("")}</span>
                {person.image && (
                  <img
                    src={person.image}
                    alt=""
                    loading="lazy"
                    onError={(event) => { event.currentTarget.style.display = "none"; }}
                  />
                )}
              </div>
              <div className="team-member-copy">
                <span className="team-member-role">{person.designation}</span>
                <h3>{person.developerName}</h3>
                <p>{person.discription}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamCard;
