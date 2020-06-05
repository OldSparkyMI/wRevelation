import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { of } from 'rxjs';
import { Entry } from 'src/app/core/interfaces/wRevelation.interface';
import { EntryType } from 'src/app/core/enums/wRevelation.enum';

@Component({
  selector: 'wrevelation-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss'],
})
export class EntriesComponent {

  @Input()
  set entries(entries: Entry[]) {
    if (entries) {
      this.dataSource.data = entries;
    } else {
      this.dataSource.data = [];
    }
  }
  get entries() {
    return this.dataSource.data;
  }

  @Output() activeEntry: EventEmitter<Entry> = new EventEmitter<Entry>();

  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<Entry>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<Entry, Entry>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeFlatDataSource<Entry, Entry>;

  constructor() {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren);

    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  onClick(activeEntry) {
    this.activeEntry.next(activeEntry);
  }

  /** Transform the data to something the tree can read. */
  private transformer(node: Entry, level: number): Entry {
    node.level = level;
    return node;
  }

  /** Get whether the node has children or not. */
  hasChild(index: number, node: Entry) {
    return node.expandable;
  }

  /** Get the level of the node */
  private getLevel(node: Entry) {
    return node.level;
  }

  /** Get whether the node is expanded or not. */
  private isExpandable(node: Entry) {
    return node.expandable;
  }

  /** Get the children for the node. */
  private getChildren(node: Entry) {
    return of(node.children);
  }

  private getData(node: Entry) {
    return of(node);
  }

}
