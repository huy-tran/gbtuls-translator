<template>
  <div id="q-app">
    <q-dialog v-model="visibleDialog" @hide="handleCloseDialog">
      <q-card class="gb-card q-pa-lg">
        <q-item>
          <q-item-section avatar>
            <q-avatar square size="lg">
              <img src="~/assets/logo.svg">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>GbTuls Translator</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-card-section horizontal>
          <q-card-section class="col-6">
            <q-select
              v-model="languageSource"
              :options="languageSourceOptions"
              outlined
              use-input
              label="Language Source"
              class="q-mb-lg"
              @filter="filterLanguageSource"
            />

            <q-input
              v-model="textSource"
              outlined
              autofocus
              autogrow
              debounce="500"
              type="textarea"
            />
          </q-card-section>

          <q-separator vertical />

          <q-card-section class="col-6">
            <q-select
              v-model="languageTarget"
              :options="languageTargetOptions"
              outlined
              use-input
              label="Language Target"
              class="q-mb-lg"
              @filter="filterLanguageTarget"
            />

            <q-input
              :value="result"
              filled
              autogrow
              readonly
              type="textarea"
            />
          </q-card-section>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import languages from './languages.json'

export default {
  name: 'App',

  data () {
    return {
      visibleDialog: false,
      textSource: '',
      languageSource: { label: 'Auto Detect', value: 'auto' },
      languageTarget: { label: 'Vietnamese', value: 'vi' },
      result: '',
      languageSourceOptions: languages,
      languageTargetOptions: languages
    }
  },

  mounted () {
    this.$q.bex
      .on('gb.translator.interact', event => {
        this.textSource = event.data.source
        this.visibleDialog = true
      })
  },

  methods: {
    handleCloseDialog () {
      this.textSource = ''
      this.$q.bex.send('gb.translator.inactivate')
    },

    filterLanguageSource (val, update) {
      if (val === '') {
        update(() => {
          this.languageSourceOptions = languages
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.languageSourceOptions = languages.filter(language => language.label.toLowerCase().indexOf(needle) > -1)
      })
    },

    filterLanguageTarget (val, update) {
      if (val === '') {
        update(() => {
          this.languageTargetOptions = languages
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.languageTargetOptions = languages.filter(language => language.label.toLowerCase().indexOf(needle) > -1)
      })
    },

    async translate (value) {
      const query = value || this.textSource

      if (query) {
        const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${this.languageSource.value}&tl=${this.languageTarget.value}&dt=t&q=${query}`)

        const body = await response.json()

        this.result = body[0].reduce((result, current) => {
          return result + current[0] + '\n\n'
        }, '').trim('\n\n')
      }
    }
  },

  watch: {
    textSource (value) {
      this.translate(value)
    },

    languageSource () {
      this.translate()
    },

    languageTarget () {
      this.translate()
    }
  }
}
</script>

<style lang="sass" scoped>
  .gb-card
    width: 100%
    max-width: 1024px
</style>
