const BLOCK_NODES = new Set(['heading', 'paragraph', 'quote', 'listitem'])

function inlineText(node) {
  if (!node || typeof node !== 'object') {
    return ''
  }

  if (typeof node.text === 'string') {
    return node.text
  }

  if (!Array.isArray(node.children)) {
    return ''
  }

  return node.children.map(inlineText).join('')
}

function collectParagraphs(node, paragraphs) {
  if (!node || typeof node !== 'object') {
    return
  }

  if (!Array.isArray(node.children)) {
    return
  }

  if (BLOCK_NODES.has(node.type)) {
    const text = inlineText(node).trim()
    if (text) {
      paragraphs.push(text)
    }
    return
  }

  node.children.forEach((child) => collectParagraphs(child, paragraphs))
}

export function getFirstNonEmpty(...values) {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) {
      return value.trim()
    }
  }

  return ''
}

export function splitTextToParagraphs(value) {
  if (typeof value !== 'string' || !value.trim()) {
    return []
  }

  return value
    .split(/\n{2,}|\r\n\r\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

export function richTextToParagraphs(richText) {
  const children = richText?.root?.children
  if (!Array.isArray(children)) {
    return []
  }

  const paragraphs = []
  children.forEach((node) => collectParagraphs(node, paragraphs))
  return paragraphs
}

export function richTextToPlainText(richText) {
  return richTextToParagraphs(richText).join('\n')
}
