interface IComponent {
  parent?: HTMLElement | Component;
  tag?: keyof HTMLElementTagNameMap;
}
export type ComponentProps<T = HTMLElement> = IComponent & Partial<T>;

export class Component<T extends HTMLElement = HTMLElement> {
  public readonly node: T;

  constructor(props?: ComponentProps<T>) {
    this.node = document.createElement(props?.tag ?? 'div') as T;
    if (props) {
      Object.assign(this.node, props);
    }
    if (props?.parent) {
      props.parent.append(this.node);
    }
  }

  public destroy(): void {
    this.node.remove();
  }

  public clear(): void {
    this.node.replaceChildren();
  }

  private static toNode(component: string | Node | Component): Node {
    if (typeof component === 'string') {
      return document.createTextNode(component);
    }
    return component instanceof Component ? component.node : component;
  }
  private insert(target: 'before' | 'prepend' | 'append' | 'after', children: (string | Node | Component)[]): void {
    this.node[target](...children.map(Component.toNode));
  }
  public before(...children: (string | Node | Component)[]): void {
    this.insert('before', children);
  }
  public prepend(...children: (string | Node | Component)[]): void {
    this.insert('prepend', children);
  }
  public append(...children: (string | Node | Component)[]): void {
    this.insert('append', children);
  }
  public after(...children: (string | Node | Component)[]): void {
    this.insert('after', children);
  }

  public replaceWith(...nodes: (string | Node | Component)[]): void {
    return this.node.replaceWith(...nodes.map(Component.toNode));
  }
}
