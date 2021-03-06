<template>
  <div class="search-container">
    <div class="search-bar">
      <img class="movie-icon" src="../assets/icons/movie.svg" alt="Movie icon">
      <input placeholder="Enter movie name" class="search-field" type="text">
      <button class="search-button">
        <img class="search-icon" src="../assets/icons/search.svg" alt="Search icon">
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search"
};
</script>

<style scoped lang="scss">
.search-container {
  text-align: center;
  padding: 25px 0 15px;
  font-weight: 400;
  background-image: linear-gradient(to left, #e93a1b, #ff690f);
  width: 100%;
  height: 100%;

  .search-bar {
    display: flex;
    width: 95%;
    margin: 0 auto;
    position: relative;

    .movie-icon {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      left: 20px;
      filter: invert(100%);
      width: 25px;
    }

    .search-field {
      box-sizing: border-box;
      width: 95%;
      background-color: rgba(255, 255, 255, 0.3);
      border: 0;
      border-radius: 5px;
      padding: 15px 0 15px 45px;
      font-weight: bolder;
      color: white;

      &::-webkit-input-placeholder {
        color: white;
      }

      &:focus {
        outline: none;
      }
    }

    .search-button {
      mix-blend-mode: screen;
      box-sizing: border-box;
      padding: 10px 0;
      margin-left: 5px;
      border-radius: 5px;
      border: 0;
      width: 5%;
      font-size: 20px;
      min-width: 30px;
      display: inline-block;
      background-color: white;
      cursor: pointer;

      &:focus {
        outline: none;
      }

      &:hover {
        opacity: 0.8;
      }

      .search-icon {
        width: 30px;
      }
    }
  }
}
</style>
