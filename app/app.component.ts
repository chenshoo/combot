import { Component, OnInit, ViewChild } from '@angular/core';
import { Ng2TreeSettings, NodeEvent, RenamableNode, TreeModel } from '../../../index';
import { NodeMenuItemAction } from '../../menu/menu.events';
import { MenuItemSelectedEvent } from '../../tree.events';

declare const alertify: any;

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent implements OnInit {
  public settings: Ng2TreeSettings = {
    rootIsVisible: true
  };

public ffs: TreeModel = {value: 'hello im your bot, how can i help you?',
    id: 1,
    children: [
         /* {value: 'Actobat3', id: 2, children: []},
          {value: 'Complib', id: 3, children: []},
          {value: 'Eudora', id: 4, children: []},*/
        ],
        settings: {
          isCollapsedOnInit: true,
          leftMenu: true,
          templates: {
            leftMenu: '<i class="fa fa-navicon"></i>',
            leaf: '<i class="fa fa-link"></i>'
          }
        },
};

  private lastFFSNodeId = 5;
  @ViewChild('treeFFS') public treeFFS;

  private static logEvent(e: NodeEvent, message: string): void {
    console.log(e);
    alertify.message(`${message}: ${e.node.value}`);
  }

  public ngOnInit(): void {
  }

  public onNodeRemoved(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Removed');
  }

  public onNodeMoved(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Moved');
  }

  public onNodeRenamed(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Renamed');
  }

  public onNodeCreated(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Created');
  }

  public onNodeFFSCreated(e: NodeEvent, controller): void {
    AppComponent.logEvent(e, 'Created');
    if (controller) {
      controller.changeNodeId(++this.lastFFSNodeId);
    }
  }

  public onNodeSelected(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Selected');
  }

  public onMenuItemSelected(e: MenuItemSelectedEvent) {
    AppComponent.logEvent(e, `You selected ${e.selectedItem} menu item`);
  }

  public onNodeExpanded(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Expanded');
  }

  public onNodeCollapsed(e: NodeEvent): void {
    AppComponent.logEvent(e, 'Collapsed');
  }


  //action - 'select', 'collapse', 'expand', 'remove', 'reloadChildren' 
  
  public handleActionOnFFS(id: number | string, action: string) {
    const treeController = this.treeFFS.getControllerByNodeId(id);
    if (treeController && typeof treeController[action] === 'function') {
      treeController[action]();
    } else {
      console.log('There isn`t a controller for a node with id - ' + id);
    }
  }
  
  public reset()
  {
    this.setChildrenFFS(1);
  }

  public setChildrenFFS(id: number | string) {
    const treeController = this.treeFFS.getControllerByNodeId(id);
    if (treeController && typeof treeController.setChildren === 'function') {
      treeController.setChildren([
      ]);
      //window.location.reload();
    } else {
      console.log('There isn`t a controller for a node with id - ' + id);
    }
  }
}
