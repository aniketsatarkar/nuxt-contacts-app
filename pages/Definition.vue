<template>
  <b-container fluid>
    <b-row class="mt-3">
      <b-col cols="12">
        <b-card class="p-0">
          <b-card-body>
            <b-row>
              <b-col cols="auto" style="border-right: solid 1px gray;">
                <h1 class="word">{{ word.word }}</h1>
              </b-col>
              <b-col cols="auto" v-if="word.pronounciation">
                <table>
                  <tr>
                    <td class="text-center text-gray"><span>Pronounciation</span></td>
                  </tr>
                  <tr>
                    <td class="text-center text-bold"><span class="span">{{ word.pronounciation }}</span></td>
                  </tr>
                </table>
              </b-col>
              <b-col cols="auto" v-if="word.origin">
                <table>
                  <tr>
                    <td class="text-center text-gray"><span>Origin</span></td>
                  </tr>
                  <tr>
                    <td class="text-center text-bold"><span class="span">{{ word.origin }}</span></td>
                  </tr>
                </table>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>

        <b-card class="mt-3 p-0">
          <b-card-body>
            <b-row>
              <b-col col="auto">
                <h4>#1</h4>
              </b-col>
              <b-col col="auto">
                <b-button>Up Vote</b-button>
                <b-button>Down Vote</b-button>
              </b-col>
            </b-row>
            <hr>
            <b-col>
              <p class="definition">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </b-col>
          </b-card-body>
        </b-card>

        <b-row align-h="center" class="mt-3">
          <b-col cols="auto">
            <b-button>Show More</b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'dectionary',
  data() {
    return {
      word: {
        word: 'word',
        origin: 'English',
        pronounciation: 'word'
      },
      definitions: []
    };
  },
  methods: {
    // ...
  },
  computed : {
    // ...
  },
}
</script>

<style scoped>
.word {
  color: #129ae0;
  font-style: italic;
}
.text-gray {
  color: gray;
}
.text-bold {
  font-weight: bolder;
}
.definition {
  font-style: italic;
}
</style>
