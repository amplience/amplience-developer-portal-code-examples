import './styles.css';

const Banner = ({ headline, strapline, background = {}, link = {} }) => {
  return (
    <section className="banner">
      <header>
        <h1>{headline}</h1>
        <h2>{strapline}</h2>
      </header>
      <img src={background.image?.url().build()} alt={background.alt} />
      <a href={link.url}>{link.title}</a>
    </section>
  );
};

export default Banner;
