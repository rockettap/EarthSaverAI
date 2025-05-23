import { h } from 'vue'

import type { IconProps, IconSet } from 'vuetify'

import IconExclamation from '@/components/icons/IconExclamation.vue'
import IconFluentCalendar from '@/components/icons/IconFluentCalendar.vue'
import IconSolarGlobus from '@/components/icons/IconSolarGlobus.vue'

const aliases = {
  exclamation: 'exclamation',
  calendar: 'fluent-calendar',
  solarGlobus: 'solar-globus',
}

const custom: IconSet = {
  component: (props: IconProps) => {
    if (props.icon === 'exclamation') {
      return h(IconExclamation, { ...props })
    }
    if (props.icon === 'fluent-calendar') {
      return h(IconFluentCalendar, { ...props })
    }
    if (props.icon === 'solar-globus') {
      return h(IconSolarGlobus, { ...props })
    }

    return null
  },
}

export { aliases, custom }
