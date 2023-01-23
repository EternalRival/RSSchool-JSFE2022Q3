import { Component, ComponentProps } from '../../components/Component';
import { Heading } from '../../components/Heading';
import { Section } from '../../components/Section';
import { Route } from '../../types/enums';
import { IWinner, IWinnerTableItem } from '../../types/interfaces';
import { Pagination } from './pagination';

export class Winners extends Section {
  // TODO
  public total = new Component({ tag: 'span', className: `${this.route}__total-counter` });
  private tableBody = new Component<HTMLTableSectionElement>({ tag: 'tbody', className: 'winners-table__tbody' });

  constructor(private route: Route, props?: ComponentProps) {
    super({ ...props, className: `section ${route}` });

    const heading = new Heading({ tag: 'h1', className: `${route}__heading`, textContent: route });
    const pagination = new Pagination(route);

    const table = new Component({ tag: 'table', className: 'winners-table' });
    const tableHead = new Component({ parent: table, tag: 'thead', className: 'winners-table__thead' });
    const tableHeadRow = new Component({ parent: tableHead, tag: 'tr', className: 'winners-table__tr' });
    ['Number', 'Car', 'Name', 'Wins', 'Best time (seconds)'].forEach(
      (name) => new Component({ parent: tableHeadRow, tag: 'th', className: 'winners-table__th', textContent: name }),
    );

    this.container.append(pagination, heading, table);
    heading.append(this.total);
    table.append(this.tableBody);
  }

  public buildWinnerRow(winner: IWinnerTableItem): HTMLTableRowElement {
    const row = new Component<HTMLTableRowElement>({ tag: 'tr', className: 'winners-table__tr' });
    Object.values(winner).forEach((cell, index) => {
      const td = new Component({ parent: row, tag: 'td', className: 'winners-table__td' });
      if (index === 1) {
        td.style.setProperty('--car-color', cell);
        td.classList.add('winners-table__car');
      } else {
        td.text = cell;
      }
    });
    return row.node;
  }

  public renderCars(winners: IWinnerTableItem[]): void {
    this.tableBody.node.replaceChildren(...winners.map((winner) => this.buildWinnerRow(winner)));
  }
}
