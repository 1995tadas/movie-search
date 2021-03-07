<template>
  <div class="search-container">
    <div class="search-bar">
      <span class="movie-icon" v-if="loading">
        <i class="fas fa-spinner fa-spin"></i>
      </span>
      <img
        v-else
        class="movie-icon"
        src="../assets/icons/movie.svg"
        alt="Movie icon"
        :style="{ filter: 'invert(100%)' }"
      />
      <input
        v-model="inputFirst"
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
        <div class="movie-datalist" v-if="results.length" @mousedown.prevent>
          <div class="datalist-input">
            <img
              class="movie-icon"
              src="../assets/icons/movie.svg"
              alt="Movie icon"
              :style="{ width: '20px' }"
            />
            <input v-model="inputSecond" @keyup="autoComplete" autofocus />
            <span class="search-sub">Enter a movie name</span>
          </div>
          <hr />
          <template v-for="(result, index) in results">
            <div
              class="datalist-item"
              v-if="index <= 7"
              :key="result.id"
              @click="selectDatalist(result.title)"
            >
              <span class="movie-title">{{ result.title }}</span>
              <div class="search-sub">
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
      inputFirst: "",
      inputSecond: "",
      loading: false,
      searchUrl: "https://api.themoviedb.org/3/search/movie",
      results: [],
      timeOut: ""
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

      this.loading = true;
      this.debounce(this.fetchMovies);
    },
    fetchMovies() {
      axios
        .get(this.searchUrl, {
          params: {
            api_key: "3937f3a23653e2df41f781c8d547cc6e",
            language: "en-US",
            query: this.query
          }
        })
        .then(response => {
          this.results = response.data.results;
        })
        .catch(error => {
          console.log(error.response.data.status_message);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    closeAutoComplete() {
      this.results = [];
    },
    selectDatalist(title) {
      this.inputFirst = title;
      this.closeAutoComplete();
    },
    debounce(fn) {
      if (this.timeOut) {
        clearTimeout(this.timeOut);
      }

      this.timeOut = setTimeout(function() {
        fn();
      }, 500);
    },

    // Dates selection logic
    isDateValid(date) {
      return new RegExp("^\\d{4}-[0,1]\\d-[0,1,2,3]\\d$").test(date);
    },
    selectYear(date) {
      return date.slice(0, 4);
    }
  },
  watch: {
    inputFirst: function() {
      this.query = this.inputFirst;
      this.inputSecond = this.inputFirst;
    },
    inputSecond: function() {
      this.inputFirst = this.inputSecond;
    }
  }
};
</script>

<style scoped lang="scss">
$input-left-padding: 45px;
$input-color: #fff;
$sub-color: #838282;
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
      width: 25px;
      color: $input-color;
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
    .datalist-input,
    .datalist-item {
      padding: 12px 0 12px $input-left-padding;
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
      margin-top: -10px;
      text-align: left;
      box-shadow: 1px 4px 10px 1px $shadow-color;

      .datalist-input {
        box-sizing: border-box;
        background-color: $input-color;
        position: relative;

        input {
          display: block;
          width: 100%;
          border: 0;
          padding: 0;

          &:focus {
            outline: none;
          }
        }
      }

      .datalist-item {
        background-color: $input-color;
        cursor: pointer;

        &:hover {
          background-color: $shadow-color;
        }
      }

      .movie-title,
      .datalist-input input {
        font-weight: bold;
        font-size: 1.2rem;
      }

      .search-sub {
        color: $sub-color;
      }
    }
  }
}

input {
  text-transform: capitalize;
}

hr {
  margin: 0;
}
</style>
