declare module 'vuetify' {
  export function createVuetify(options?: any): any
}

declare module 'vuetify/components' {
  export const VApp: any
  export const VMain: any
  export const VContainer: any
  export const VRow: any
  export const VCol: any
  export const VCard: any
  export const VCardTitle: any
  export const VCardText: any
  export const VTabs: any
  export const VTab: any
  export const VProgressCircular: any
  export const VAlert: any
  export const VWindow: any
  export const VWindowItem: any
}

declare module 'vuetify/directives' {
  export const Ripple: any
  export const ClickOutside: any
}

// Vue component declarations
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
} 