import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { of } from 'rxjs';
import { Entry } from 'src/app/core/interfaces/wRevelation.interface';

@Component({
  selector: 'wrevelation-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EntriesComponent),
    multi: true
  }]
})
export class EntriesComponent implements OnChanges {

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

  @Input() activeEntry: Entry;
  @Output() activeEntryChange: EventEmitter<Entry> = new EventEmitter<Entry>();

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.activeEntry) {
      // if the active entry is changed from the outside, expand it, if possible
      const entry = changes.activeEntry.currentValue;
      if (entry?.expandable) {
        this.treeControl.expand(entry);
      }
    }
  }

  onNodeClick(activeEntry) {
    this.activeEntryChange.next(activeEntry);
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
