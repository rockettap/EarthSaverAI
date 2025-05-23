import { createVuetify } from 'vuetify'
import { VCombobox } from 'vuetify/components/VCombobox'
import { VIcon } from 'vuetify/components/VIcon'
import { VSelect } from 'vuetify/components/VSelect'
import { VSlider } from 'vuetify/components/VSlider'
import 'vuetify/styles'

import { aliases, custom } from '@/iconsets/custom'

const vuetify = createVuetify({
  components: {
    VCombobox,
    VSelect,
    VIcon,
    VSlider,
  },
  icons: {
    defaultSet: 'custom',
    aliases,
    sets: {
      custom,
    },
  },
})

export default vuetify
