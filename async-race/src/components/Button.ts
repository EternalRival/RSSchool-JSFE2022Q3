import { Component, ComponentProps } from './Component';

export class Button extends Component<HTMLButtonElement> {
  constructor(props?: ComponentProps<HTMLButtonElement>) {
    super({ ...props, tag: 'button' });
  }
}
