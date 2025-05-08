import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                aligning_the_stars: resolve(__dirname, 'stories/aligning_the_stars/aligning_the_stars.html'),
                aligning_the_stars_1: resolve(__dirname, 'stories/aligning_the_stars/chapters/01.html'),
                aligning_the_stars_2: resolve(__dirname, 'stories/aligning_the_stars/chapters/02.html'),
                bad_meets_bad: resolve(__dirname, 'stories/bad_meets_bad/bad_meets_bad.html'),
                bad_meets_bad_1: resolve(__dirname, 'stories/bad_meets_bad/chapters/01.html'),
                bad_meets_bad_2: resolve(__dirname, 'stories/bad_meets_bad/chapters/02.html'),
                blood_lust: resolve(__dirname, 'stories/blood_lust/blood_lust.html'),
                blood_lust_1: resolve(__dirname, 'stories/blood_lust/chapters/01.html'),
                blood_lust_2: resolve(__dirname, 'stories/blood_lust/chapters/02.html'),
                catching_feelings: resolve(__dirname, 'stories/catching_feelings/catching_feelings.html'),
                catching_feelings_1: resolve(__dirname, 'stories/catching_feelings/chapters/01.html'),
                catching_feelings_2: resolve(__dirname, 'stories/catching_feelings/chapters/02.html'),
                itll_be_our_secret: resolve(__dirname, 'stories/itll_be_our_secret/itll_be_our_secret.html'),
                itll_be_our_secret_1: resolve(__dirname, 'stories/itll_be_our_secret/chapters/01.html'),
                itll_be_our_secret_2: resolve(__dirname, 'stories/itll_be_our_secret/chapters/02.html'),
                love_life: resolve(__dirname, 'stories/love_life/love_life.html'),
                love_life_1: resolve(__dirname, 'stories/love_life/chapters/01.html'),
                love_life_2: resolve(__dirname, 'stories/love_life/chapters/02.html'),
                rule_breaker: resolve(__dirname, 'stories/rule_breaker/rule_breaker.html'),
                rule_breaker_1: resolve(__dirname, 'stories/rule_breaker/chapters/01.html'),
                rule_breaker_2: resolve(__dirname, 'stories/rule_breaker/chapters/02.html')
            },
        },
    },
})