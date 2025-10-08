/**
 * 🇿🇼 Nyuchi Platform - DataTable Types
 * Notion-style table component types
 */

export type ViewType = 'table' | 'kanban' | 'cards';

export type ColumnType = 'text' | 'select' | 'date' | 'number' | 'email' | 'url' | 'multiselect';

export interface Column<T = any> {
  id: string;
  label: string;
  type: ColumnType;
  width?: number;
  editable?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  options?: string[]; // For select/multiselect
  render?: (value: any, row: T) => React.ReactNode;
  getValue?: (row: T) => any;
  setValue?: (row: T, value: any) => void;
}

export interface DataTableProps<T = any> {
  data: T[];
  columns: Column<T>[];
  onUpdate?: (id: string, field: string, value: any) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  onCreate?: () => void;
  loading?: boolean;
  searchable?: boolean;
  groupByColumn?: string; // For kanban view
  emptyMessage?: string;
  emptyAction?: {
    label: string;
    onClick: () => void;
  };
}

export interface CellEditProps {
  value: any;
  column: Column;
  onSave: (value: any) => void;
  onCancel: () => void;
}
