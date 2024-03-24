export const operations = {
  insert: {
    type: 'insert',
    verb: 'Add'
  },

  update: {
    type: 'update',
    verb: 'Update'
  },
  delete: {
    type: 'delete',
    verb: 'Remove'
  }
} as const

export type Operations = typeof operations

export type OperationType = keyof Operations

export type Operation = Operations[OperationType]
