/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */

import "@tanstack/react-table"

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends unknown = unknown, TValue = unknown> {
    label?: string
  }
}
