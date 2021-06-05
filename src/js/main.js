'use-strict';

const main = {

    tabs: function() {
        const $navigationItems = document.querySelectorAll( '.our-favorites__tabs_navigation_item' );
        const $contentItems = document.querySelectorAll( '.our-favorites__tabs_content_item' );

        $navigationItems[0].classList.add( 'our-favorites__tabs_navigation_item--active' );
        $contentItems[0].classList.add( 'our-favorites__tabs_content_item--active' );

        function clearActiveItems() {
            const activeNavigation = document.querySelector( '.our-favorites__tabs_navigation_item--active' );
            const activeContent = document.querySelector( '.our-favorites__tabs_content_item--active' );

            activeNavigation.classList.remove( 'our-favorites__tabs_navigation_item--active' );
            activeContent.classList.remove( 'our-favorites__tabs_content_item--active' );

        }
        

        $navigationItems.forEach( ( item, index ) => {            
            item.addEventListener( 'click', () => {
                clearActiveItems();
                item.classList.add( 'our-favorites__tabs_navigation_item--active' );
                $contentItems[index].classList.add('our-favorites__tabs_content_item--active');
            } );
        } );



    }


};

main.tabs();