<script>
  export let title;
  export let subtitle;
  export let image;
  export let link;

  $: src = image.url().width(1200).height(680).build();
</script>

<section class="banner">
  <header>
    <h1>{title}</h1>
    <h2>{subtitle}</h2>
  </header>
  <img {src} alt="" />
  <a href={link?.url}>{link?.title}</a>
</section>

<style>
  @import url(https://fonts.googleapis.com/css?family=Roboto);

  .banner {
    font-family: Roboto, Arial, Helvetica, sans-serif;
    position: relative;
    width: 100%;
  }

  .banner h1 {
    font-size: 30px;
  }

  .banner header {
    position: absolute;
    top: 20px;
    width: 100%;
    padding: 0 20px;
    text-align: left;
    color: white;
  }

  .banner img {
    width: 100%;
    height: auto;
  }

  .banner a {
    position: absolute;
    bottom: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    right: 20px;
    padding: 10px;
    text-decoration: none;
  }

  .banner a:hover {
    background-color: rgba(0, 0, 0, 1);
  }
</style>
