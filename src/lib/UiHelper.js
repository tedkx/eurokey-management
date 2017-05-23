import Helper   from './Helper'

export const DEFAULT_TOOLTIP_PLACEMENT = 'left'

const UiHelper = {
    getOffset: (element) => {
        if(Helper.isNil(element))
            return { x: 0, y: 0 };

        let xPosition = 0,
            yPosition = 0;

        while(element) {
            xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
            yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
            element = element.offsetParent;
        }

        return { x: xPosition, y: yPosition };
    }
}

export default UiHelper