export function usePageMeta(title: string, description?: string) {
  document.title = title + ' - ToolBox'
  let meta = document.querySelector('meta[name="description"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'description')
    document.head.appendChild(meta)
  }
  if (description) meta.setAttribute('content', description)
}
