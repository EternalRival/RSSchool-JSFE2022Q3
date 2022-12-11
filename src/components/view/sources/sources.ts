import { IDrawSource, Source } from '../../interfaces/interfaces';
import './sources.css';

class Sources implements IDrawSource {
    draw(data: Source[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
        if (!sourceItemTemp) throw new Error(`Element #sourceItemTemp is missing`);

        data.forEach((item: Source) => {
            const sourceClone: HTMLTemplateElement | null = sourceItemTemp.content.cloneNode(
                true
            ) as HTMLTemplateElement;
            if (sourceClone) {
                const sourceItemName: HTMLTemplateElement | null = sourceClone.querySelector('.source__item-name');
                if (sourceItemName) sourceItemName.textContent = item.name;
                const sourceItem: HTMLTemplateElement | null = sourceClone.querySelector('.source__item');
                if (sourceItem) sourceItem.setAttribute('data-source-id', item.id);
            }
            fragment.append(sourceClone);
        });
        const sources: HTMLTemplateElement | null = document.querySelector('.sources');
        if (sources) sources.append(fragment);
    }
}

export default Sources;
