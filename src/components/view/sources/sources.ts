import { Source } from '../../../types/interfaces/source.interface';
import './sources.css';

class Sources {
  draw(data: Source[]) {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
    if (!sourceItemTemp) return;

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true);

      if (!(sourceClone instanceof DocumentFragment)) return;

      const itemName = sourceClone.querySelector('.source__item-name');
      if (itemName) itemName.textContent = item.name;
      sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    document.querySelector('.sources')?.append(fragment);
  }
}

export default Sources;
