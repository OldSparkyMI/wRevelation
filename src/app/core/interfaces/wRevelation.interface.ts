import { EntryType, HumanizedFieldType, RawFieldType } from '../enums/wRevelation.enum';

export interface Entry {
  name: string;
  type: EntryType;
  icon: string;
  description: string;
  notes: string;
  updated: string;
  fields: {}; // the whole content should be a instanceof EntryField

  /**
   * Needed for MatTreeView
   */
  children: Entry[];
  level: number;
  expandable: boolean;
}

export interface EntryField {
  id: RawFieldType;
  key: HumanizedFieldType;
  value: string;
}
