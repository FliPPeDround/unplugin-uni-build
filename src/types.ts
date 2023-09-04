import type { SFCTemplateBlock } from '@vue/compiler-sfc'

export interface Options {
  include?: string
  exclude?: string
}

export interface VueSourceInfo {
  content: string
  lang: string
  scoped?: boolean
}

export interface StyleSourceInfo {
  content: string
  scoped: boolean
  lang: string
}

export interface descriptorSFC {
  template?: any
  script?: string
  scriptSetup?: string
  styles?: StyleSourceInfo[]
}

export type TemplateASTNode = SFCTemplateBlock['ast']
