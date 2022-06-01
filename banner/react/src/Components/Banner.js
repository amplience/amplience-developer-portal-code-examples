import React from 'react';
import './banner.css';

const Banner = ({ title, subtitle, image, link = {} }) => {
  const src = image?.url().width(1200).height(680).build();

  return (
    <section className="banner">
      <header>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </header>
      <img src={src} alt="" />
      <a href={link.url}>{link.title}</a>
    </section>
  );
};

export default Banner;
