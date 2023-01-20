import { Component, ComponentProps } from '../../components/Component';
import { Heading } from '../../components/Heading';
import { Section } from '../../components/Section';
import { Route } from '../../types/enums';
import { Pagination } from './pagination';

export class Winners extends Section {
  // TODO
  public total = new Component({ tag: 'span', className: `${this.route}__total-counter` });

  constructor(private route: Route, props?: ComponentProps) {
    super({ ...props, className: `section ${route}` });

    const heading = new Heading({ tag: 'h1', className: `${route}__heading`, textContent: route });
    const pagination = new Pagination(route);

    this.container.append(pagination, heading);
    heading.append(this.total);
  }
}
