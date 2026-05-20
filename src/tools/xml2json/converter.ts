import { XMLParser } from 'fast-xml-parser'

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  parseAttributeValue: true,
  parseTagValue: true,
  trimValues: true,
})

export function xml2json(xml: string): { data?: string; error?: string } {
  try {
    const result = parser.parse(xml)
    return { data: JSON.stringify(result, null, 2) }
  } catch (e: any) {
    return { error: e.message || 'XML 解析失败' }
  }
}
