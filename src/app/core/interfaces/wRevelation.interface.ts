import { EntryType, HumanizedFieldType, RawFieldType } from '../enums/wRevelation.enum';

export interface Entry {
  name: string;
  type: EntryType;
  icon: string;
  description: string;
  notes: string;
  updated: string;
  // for every key the value have to be an instance of EntryField
  fields: {};
  parent: Entry;

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
