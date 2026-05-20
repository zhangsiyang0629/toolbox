import { Parser } from 'node-sql-parser'

const parser = new Parser()

export interface ColumnDef {
  name: string
  type: string
  notNull: boolean
  defaultValue?: string
  comment?: string
  primaryKey: boolean
  autoIncrement: boolean
}

export interface TableDef {
  tableName: string
  columns: ColumnDef[]
}

export function parseSQL(sql: string): { tables?: TableDef[]; error?: string } {
  const trimmed = sql.trim().toUpperCase()
  if (!trimmed.startsWith('CREATE TABLE')) {
    return { error: '请输入 CREATE TABLE 语句，本工具仅支持 DDL 转换' }
  }
  try {
    const ast = parser.astify(sql)
    const tables: TableDef[] = []

    const list = Array.isArray(ast) ? ast : [ast]
    for (const stmt of list) {
      if ((stmt as any).type !== 'create') continue
      const create = stmt as any
      const tableName = create.table?.[0]?.table || 'unknown'
      const columns: ColumnDef[] = []
      const defs = create.create_definitions || []
      const pkColumns: string[] = []

      // First pass: find primary key constraints
      for (const col of defs) {
        if (col.resource === 'constraint' || col.type === 'constraint') {
          const def = col.definition
          if (def?.type === 'primary key') {
            const keys = def.columns || []
            for (const k of keys) {
              pkColumns.push(typeof k === 'string' ? k : (k.column || k.name))
            }
          }
        }
      }

      // Second pass: extract column definitions
      for (const col of defs) {
        if (col.resource !== 'column') continue

        const name = col.column?.column || ''
        const rawType = (col.definition?.dataType || '').toUpperCase()
        const length = col.definition?.length
        const typeStr = length ? `${rawType}(${length})` : rawType

        const notNull = col.nullable?.type === 'not null'
        const primaryKey = col.primary_key === 'primary key' || pkColumns.includes(name.toLowerCase())
        const autoIncrement = col.auto_increment === 'auto_increment'

        let defaultValue: string | undefined
        const dv = col.definition?.default_val
        if (dv) {
          if (dv.type === 'single_quote_string') defaultValue = "'" + dv.value + "'"
          else if (dv.type === 'number') defaultValue = String(dv.value)
          else if (dv.value && dv.value.value) defaultValue = String(dv.value.value)
          else defaultValue = dv.value !== undefined ? String(dv.value) : undefined
        }
        // Check for default in suffix
        if (!defaultValue && col.definition?.suffix) {
          for (const s of col.definition.suffix) {
            if (s?.type === 'default') {
              const sv = s?.value
              if (sv?.value !== undefined) defaultValue = String(sv.value)
              else if (sv?.type === 'default') defaultValue = 'DEFAULT'
            }
          }
        }

        let comment: string | undefined
        if (col.definition?.comment?.value) {
          comment = col.definition.comment.value
        }

        columns.push({ name, type: typeStr, notNull, primaryKey, defaultValue, comment, autoIncrement })
      }

      tables.push({ tableName, columns })
    }

    if (tables.length === 0) return { error: '未找到 CREATE TABLE 语句' }
    return { tables }
  } catch (e: any) {
    return { error: e.message || 'SQL 解析失败' }
  }
}

function toGoType(sqlType: string): string {
  const t = sqlType.toUpperCase().replace(/\(.*\)/, '')
  if (t.includes('INT') || t === 'SERIAL' || t.includes('BIGINT')) return 'int64'
  if (t.includes('VARCHAR') || t.includes('CHAR') || t.includes('TEXT') || t.includes('CLOB')) return 'string'
  if (t.includes('FLOAT') || t.includes('DOUBLE') || t.includes('DECIMAL') || t.includes('NUMERIC') || t.includes('REAL')) return 'float64'
  if (t.includes('BOOL')) return 'bool'
  if (t.includes('DATE') || t.includes('TIME') || t.includes('TIMESTAMP')) return 'time.Time'
  if (t.includes('BLOB') || t.includes('BYTEA')) return '[]byte'
  if (t.includes('JSON')) return 'json.RawMessage'
  return 'string'
}

function toMongoType(sqlType: string): string {
  const t = sqlType.toUpperCase().replace(/\(.*\)/, '')
  if (t.includes('INT') || t.includes('SERIAL') || t.includes('BIGINT')) return 'NumberLong'
  if (t.includes('FLOAT') || t.includes('DOUBLE') || t.includes('DECIMAL') || t.includes('NUMERIC') || t.includes('REAL')) return 'NumberDouble'
  if (t.includes('BOOL')) return 'Boolean'
  if (t.includes('DATE') || t.includes('TIME') || t.includes('TIMESTAMP')) return 'Date'
  if (t.includes('JSON')) return 'Object'
  if (t.includes('BLOB') || t.includes('BYTEA')) return 'BinData'
  return 'String'
}

function toESType(sqlType: string): string {
  const t = sqlType.toUpperCase().replace(/\(.*\)/, '')
  if (t.includes('INT') || t.includes('SERIAL') || t.includes('BIGINT')) return 'integer'
  if (t.includes('VARCHAR') || t.includes('CHAR') || t.includes('TEXT') || t.includes('CLOB')) return 'text'
  if (t.includes('FLOAT') || t.includes('DOUBLE') || t.includes('DECIMAL') || t.includes('NUMERIC') || t.includes('REAL')) return 'float'
  if (t.includes('BOOL')) return 'boolean'
  if (t.includes('DATE') || t.includes('TIME') || t.includes('TIMESTAMP')) return 'date'
  if (t.includes('JSON')) return 'object'
  return 'keyword'
}

function toEntgoType(sqlType: string): string {
  const t = sqlType.toUpperCase().replace(/\(.*\)/, '')
  if (t.includes('INT') || t === 'SERIAL') return 'int'
  if (t.includes('BIGINT')) return 'int64'
  if (t.includes('VARCHAR') || t.includes('CHAR') || t.includes('TEXT') || t.includes('CLOB')) return 'string'
  if (t.includes('FLOAT') || t.includes('DOUBLE') || t.includes('DECIMAL') || t.includes('NUMERIC')) return 'float64'
  if (t.includes('BOOL')) return 'bool'
  if (t.includes('DATE') || t.includes('TIME') || t.includes('TIMESTAMP')) return 'time.Time'
  if (t.includes('BLOB') || t.includes('BYTEA')) return '[]byte'
  if (t.includes('JSON')) return 'json.RawMessage'
  return 'string'
}

function toGoZeroType(sqlType: string): string {
  return toGoType(sqlType)
}

function formatFieldName(name: string): string {
  if (!name) return ''
  return name.split(/[_\s-]+/).map((s, i) => i === 0 ? s.toLowerCase() : s[0].toUpperCase() + s.slice(1).toLowerCase()).join('')
}

function formatStructName(name: string): string {
  if (!name) return ''
  return name.split(/[_\s-]+/).map(s => s[0].toUpperCase() + s.slice(1).toLowerCase()).join('').replace(/[^a-zA-Z0-9]/g, '')
}

export function sql2gorm(sql: string): string | { error: string } {
  const result = parseSQL(sql)
  if (result.error) return { error: result.error }
  if (!result.tables) return { error: '解析结果为空' }

  return result.tables.map(table => {
    const structName = formatStructName(table.tableName)
    let code = 'type ' + structName + ' struct {\n'
    for (const col of table.columns) {
      const fieldName = formatStructName(col.name)
      const goType = toGormGoType(col.type)
      const jsonTag = formatFieldName(col.name)
      const gormParts: string[] = ['column:' + col.name, 'type:' + col.type.toLowerCase()]
      if (col.primaryKey) gormParts.push('primary_key')
      if (col.defaultValue) gormParts.push('default:' + col.defaultValue)
      if (col.notNull) gormParts.push('NOT NULL')
      if (col.autoIncrement) gormParts.push('AUTO_INCREMENT')
      code += '\t' + fieldName + ' ' + goType + ' `gorm:"' + gormParts.join(';') + '" json:"' + jsonTag + '"`\n'
    }
    code += '}\n'
    return code
  }).join('\n')
}

function toGormGoType(sqlType: string): string {
  const t = sqlType.toUpperCase().replace(/\(.*/, '')
  if (t.includes('BIGINT')) return 'int64'
  if (t.includes('INT') || t === 'SERIAL') return 'int'
  if (t.includes('VARCHAR') || t.includes('CHAR') || t.includes('TEXT') || t.includes('CLOB')) return 'string'
  if (t.includes('FLOAT') || t.includes('DOUBLE') || t.includes('DECIMAL') || t.includes('NUMERIC') || t.includes('REAL')) return 'float64'
  if (t.includes('BOOL')) return 'bool'
  if (t.includes('DATE') || t.includes('TIME') || t.includes('TIMESTAMP')) return 'time.Time'
  if (t.includes('BLOB') || t.includes('BYTEA')) return '[]byte'
  if (t.includes('JSON')) return 'json.RawMessage'
  return 'string'
}

export function sql2entgo(sql: string): string | { error: string } {
  const result = parseSQL(sql)
  if (result.error) return { error: result.error }
  if (!result.tables) return { error: '解析结果为空' }

  return result.tables.map(table => {
    const structName = formatStructName(table.tableName)
    let code = 'func (' + structName + ') Fields() []ent.Field {\n'
    code += '\treturn []ent.Field{\n'
    for (const col of table.columns) {
      const fieldName = formatFieldName(col.name)
      const entType = toEntgoType(col.type)
      let line = '\t\tfield.' + entType + '("' + fieldName + '")'
      if (col.primaryKey) line += '.Unique()'
      if (col.notNull) line += '.NotEmpty()'
      if (col.defaultValue) {
        if (entType === 'string') line += '.Default(' + col.defaultValue + ')'
        else if (entType === 'int' || entType === 'int64') line += '.Default(' + col.defaultValue + ')'
      }
      if (col.comment) line += '.Comment("' + col.comment + '")'
      line += ',\n'
      code += line
    }
    code += '\t}\n}\n'
    return code
  }).join('\n')
}

export function sql2es(sql: string): string | { error: string } {
  const result = parseSQL(sql)
  if (result.error) return { error: result.error }
  if (!result.tables) return { error: '解析结果为空' }

  return result.tables.map(table => {
    let code = '{\n'
    code += '\t"mappings": {\n'
    code += '\t\t"properties": {\n'
    for (const col of table.columns) {
      const esType = toESType(col.type)
      code += '\t\t\t"' + col.name + '": {\n'
      code += '\t\t\t\t"type": "' + esType + '"\n'
      if (col.primaryKey) code += '\t\t\t\t"index": true\n'
      code += '\t\t\t},\n'
    }
    code += '\t\t}\n'
    code += '\t}\n'
    code += '}\n'
    return code
  }).join('\n')
}

export function sql2gozero(sql: string): string | { error: string } {
  const result = parseSQL(sql)
  if (result.error) return { error: result.error }
  if (!result.tables) return { error: '解析结果为空' }

  return result.tables.map(table => {
    const structName = formatStructName(table.tableName)
    let code = 'type ' + structName + ' struct {\n'
    for (const col of table.columns) {
      const fieldName = formatStructName(col.name)
      const goType = toGoZeroType(col.type)
      const jsonTag = formatFieldName(col.name)
      code += '\t' + fieldName + ' ' + goType + ' `json:"' + jsonTag + '"`\n'
    }
    code += '}\n'
    return code
  }).join('\n')
}

export function sql2mongodb(sql: string): string | { error: string } {
  const result = parseSQL(sql)
  if (result.error) return { error: result.error }
  if (!result.tables) return { error: '解析结果为空' }

  return result.tables.map(table => {
    let code = '// Collection: ' + table.tableName + '\n'
    code += 'db.createCollection("' + table.tableName + '")\n\n'
    code += '// Schema validation (optional)\n'
    code += 'db.runCommand({\n'
    code += '\tcollMod: "' + table.tableName + '",\n'
    code += '\tvalidator: {\n'
    code += '\t\t$jsonSchema: {\n'
    code += '\t\t\tbsonType: "object",\n'
    code += '\t\t\trequired: [' + table.columns.filter(c => c.notNull).map(c => '"' + c.name + '"').join(', ') + '],\n'
    code += '\t\t\tproperties: {\n'
    for (const col of table.columns) {
      const mongoType = toMongoType(col.type)
      code += '\t\t\t\t"' + col.name + '": { "bsonType": "' + mongoType.toLowerCase() + '" },\n'
    }
    code += '\t\t\t}\n'
    code += '\t\t}\n'
    code += '\t}\n'
    code += '})\n'
    return code
  }).join('\n')
}
