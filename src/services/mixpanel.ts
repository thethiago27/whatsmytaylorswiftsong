import mixpanel from 'mixpanel-browser'
import { useEffect } from 'react'

mixpanel.init(String(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN))

const isProductionEnv: boolean = process.env.NODE_ENV === 'production'

export const track = (
  eventName: string,
  props: Record<string, unknown>,
): void => {
  if (isProductionEnv) {
    mixpanel.track(eventName, props)
  }
}

export const identify = (id: string): void => {
  if (isProductionEnv) {
    mixpanel.identify(id)
  }
}

export const alias = (id: string): void => {
  if (isProductionEnv) {
    mixpanel.alias(id)
  }
}
