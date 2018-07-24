import * as $ from "jquery";
import {store} from "../../index";
import {IGlobalState} from "../../appStore/stateInterfaces";

export default function ChatTree(element: JQuery) {



    let data = [];

    function load(treeData) {
        data = treeData;
        loadItems(data);
        selectText($('ul li:first-child'))
    }

    return {
        updateTree,
        handleKeyPress,
        handleClick,
        handleDbClick,
        getCurrentElementId,
        load,
    };

    /*
     - loadItems (items)
     - showElements (parent, items)
     - getCurrentElement ()
     - expend (element, items)
     - collapse (element)
     - selectText (element)
     - handleClick (event)
     - handleDbClick (element, items)
     - handleKeyPress (event, items)
     - handleEnterKey (chosenElement, items)
     - handleArrowRight (chosenElement, items)
     - handleArrowLeft (chosenElement)
     - handleArrowDown (lastMarkedElement)
     - handleArrowUp (lastMarkedElement)
     - getItemByPath (element, address)
     */
    function loadItems(items: any) {
        const ul = $(element);
        ul.css('user-select', 'none');
        ul.css('font-size', '150%');
        ul.attr('id', '');

        showElements(ul, items)
    }

    function updateTree() {
        return data
    }

    function showElements(parent: any, items: any) {
        const spaces: number = (parent.attr('id') + '1').split(',').length;
        const parentId = parent.attr('id');
        let separator = "";
        if (parentId !== "") {
            separator = ","
        }
        let index: number = 0;
        const itemsL: number = items.length;
        for (index; index < itemsL; index++) {
            const item = items[index];
            const li = $('<li>');
            li.addClass(item.type);
            li.attr('id', parent.attr('id') + separator + index);
            li.append('&nbsp;'.repeat(spaces) + item.name);
            li.css('background-color', 'transparent');

            if (item.type === 'user') {
                li.css('font-size', '85%');
                li.css('color', 'rgb(250,144,132')

            }
            if (item.type === 'group') {

                if (item.items.length > 0) {
                    li.addClass("gotChildren")
                }
                li.css('color', 'rgb(250,96,86)')
            }
            //
            if ($(parent).is("ul")) {
                li.appendTo(parent);
            }
            else {
                $(parent).after(li);
            }
        }
    }

    function getCurrentElement() {
        return $('.marked')
    }

    function getCurrentElementId(): any[] {
        const currentElement = $('.marked').attr('id');
        if (currentElement) {
            return currentElement.split(',')
        }
        return [];
    }

    function expend(curElement: any, items: any) {
        const storeData: IGlobalState = store.getState();
        if (storeData.tree.isMemberOfGroup) {
            const childrenItem = getItemByPath(items, curElement.attr('id').split(','));
            curElement.addClass('expended');
            curElement.removeClass('collapsed');
            showElements(curElement, childrenItem)
        }
    }

    function collapse(curElement: any, items: any) {
        // const childrenItem = getItemByPath(items, curElement.attr('id').split(''));
        curElement.removeClass('expended');
        curElement.addClass('collapsed');
        const parentId = curElement.attr('id').split(',');
        $.each($(curElement).nextAll(), (index, current) => {

            const currentId: any = $(current).attr('id');
            if (currentId) {
                const currentIdArrStart = currentId.split(',').slice(0, parentId.length);
                if (currentIdArrStart.join(",") === parentId.join(",")) {
                    current.remove()
                }
            }
        });
    }

    function handleClick(event: any) {
        event.preventDefault();
        event.stopPropagation();
        selectText($(event.target));
    }

    function handleDbClick(curElement: any) {

        if (curElement.hasClass('group') && curElement.hasClass("gotChildren")) {
            curElement.hasClass('expended') ? collapse(curElement, data) : expend(curElement, data)
        }
    }

    function selectText(curElement: any) {
        const li = $('li');
        li.removeClass('marked');

        li.css('background-color', 'transparent');

        curElement.addClass('marked');
        curElement.css('background-color', 'lightskyblue');
        curElement.siblings().css('background-color', 'transparent');

    }

    function handleKeyPress(event: any) {

        switch (event.which) {
            case 13:
                handleEnterKey(getCurrentElement(), data);
                break;
            case 37:
                handleArrowLeft(getCurrentElement(), data);
                break;
            case 38:
                handleArrowUp(getCurrentElement());
                break;
            case 39:
                handleArrowRight(getCurrentElement(), data);
                break;
            case 40:
                handleArrowDown(getCurrentElement());
                break;
            default:
                return
        }
        event.preventDefault()

    }

    function handleEnterKey(chosenElement: any, items: any) {
        if (chosenElement.hasClass('group')) {
            chosenElement.hasClass('expended') ? collapse(chosenElement, items) : expend(chosenElement, items)
        }
    }

    function handleArrowRight(chosenElement: any, items: any) {
        if (chosenElement.hasClass('expended')) {
            selectText($(chosenElement).next('li'))
        }
        else if (chosenElement.hasClass('group')) {
            expend(chosenElement, items)

        }
    }

    function handleArrowLeft(chosenElement: any, items: any) {
        if (chosenElement.hasClass('expended')) {

            collapse(chosenElement, items)
        }
        else if (!chosenElement.prev().is('li')) {
            selectText(chosenElement)
        }

        else {
            const currentId: any[] = chosenElement.attr('id').split(',');
            if (currentId.length <= 1) {
                selectText($('ul li:first'))
            }

            else {
                const currentParentId = currentId.slice();
                currentParentId.pop();

                if (currentParentId.length >= 1) {
                    selectText($("#" + currentParentId.join(',')))
                }
            }
        }
    }

    function handleArrowDown(lastMarkedElement: any) {
        if (lastMarkedElement.next().is('li')) {
            selectText(lastMarkedElement.next('li'));
        }
    }

    function handleArrowUp(lastMarkedElement: any) {
        if (lastMarkedElement.prev().is('li')) {
            selectText(lastMarkedElement.prev('li'));
        }

    }

    function getItemByPath(curElement: any, address: any) {
        if (arguments.length > 0) {
            const length = address.length;
            let finalPath = curElement[Number(address[0])];
            for (let index = 1; index < length; index++) {
                finalPath = finalPath.items[Number(address[index])]
            }
            return finalPath.items

        }
        return element
    }

}







