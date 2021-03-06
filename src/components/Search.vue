<template>
  <div class="search-container">
    <div class="search-bar">
      <img
        class="movie-icon"
        src="../assets/icons/movie.svg"
        alt="Movie icon"
      />
      <input
        v-model="query"
        @keyup="autoComplete"
        @blur="closeAutoComplete"
        placeholder="Enter movie name"
        class="search-field"
        type="text"
      />
      <button class="search-button">
        <img
          class="search-icon"
          src="../assets/icons/search.svg"
          alt="Search icon"
        />
      </button>
      <template>
        <div class="movie-datalist" v-show="results.length">
          <template v-for="(result, index) in results">
            <div
              v-if="index <= 7"
              class="datalist-item"
              :key="result.id"
              @mousedown.prevent
              @click="selectDatalist(result.title)"
            >
              <span class="movie-title">{{ result.title }}</span>
              <div>
                <span>{{ result.vote_average }} Rating</span>
                <span v-if="isDateValid(result.release_date)">
                  , {{ selectYear(result.release_date) }}
                </span>
              </div>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Search",
  data() {
    return {
      query: "",
      searchUrl: "https://api.themoviedb.org/3/search/movie",
      results: []
    };
  },
  methods: {
    autoComplete() {
      if (this.query.length < 3) {
        if (this.results) {
          this.results = [];
        }

        return;
      }
      axios.get(this.searchUrl, {
          params: {
            api_key: "3937f3a23653e2df41f781c8d547cc6e",
            language: "en-US",
            query: this.query
          }
        })
        .then(response => {
          console.log(response);
          this.results = response.data.results;
        });
    },
    closeAutoComplete() {
      this.results = [];
    },
    selectDatalist(title) {
      this.query = title;
      this.closeAutoComplete();
    },

    // Dates selection logic
    isDateValid(date) {
      return new RegExp("^\\d{4}-[0,1]\\d-[0,1,2,3]\\d$").test(date);
    },
    selectYear(date) {
      return date.slice(0, 4);
    }
  }
};
</script>

<style scoped lang="scss">
$input-left-padding: 45px;
$input-color: #fff;
$shadow-color: #f3f3f3;

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
      flex: 20;
      background-color: rgba(255, 255, 255, 0.3);
      border: 0;
      border-radius: 5px;
      font-weight: bolder;
      color: $input-color;
      transition: 0.2s;

      &::-webkit-input-placeholder {
        color: $input-color;
      }

      &:focus {
        outline: none;
      }
    }

    .search-field,
    .datalist-item {
      padding: 15px 0 15px $input-left-padding;
    }

    .search-button {
      mix-blend-mode: screen;
      box-sizing: border-box;
      padding: 10px 0;
      margin-left: 5px;
      border-radius: 5px;
      border: 0;
      flex: 1;
      font-size: 20px;
      min-width: 30px;
      display: inline-block;
      background-color: $input-color;
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

    .movie-datalist {
      position: absolute;
      width: calc(100% - #{$input-left-padding});
      left: $input-left-padding;
      top: 0;
      text-align: left;
      box-shadow: 1px 4px 10px 1px $shadow-color;

      .datalist-item {
        background-color: $input-color;
        cursor: pointer;
        &:hover {
          background-color: $shadow-color;
        }

        .movie-title {
          font-weight: bold;
          font-size: 1.2rem;
        }
      }
    }
  }
}
</style>
