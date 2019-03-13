import { useState, useEffect } from 'react';

import MediaQueryList from './MediaQueryList';

  
export const useMediaHook = (query) => {

    const [isMobile, setIsMobile] = useState(null);

    const mobileQuery = query || 'only screen and (max-width: 992px)'

    function updateMatches() {
        const { matches } = mediaQueryList;

        setIsMobile(matches);
    }

    var mediaQueryList = null;
    
    useEffect(() => {
        // if (typeof window !== 'object') return;

        // const targetWindow = this.props.targetWindow || window;
        const targetWindow = window;
    
        // invariant(
        //   typeof targetWindow.matchMedia === 'function',
        //   '<Media targetWindow> does not support `matchMedia`.'
        // );
    
        mediaQueryList = new MediaQueryList(
          targetWindow,
          mobileQuery,
          updateMatches
        );
        updateMatches();
    
        return () => {
            mediaQueryList && mediaQueryList.cancel();
        };
    },[isMobile]);

  return isMobile;
}


