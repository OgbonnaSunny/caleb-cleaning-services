import { useCallback, useEffect } from 'react';

const useBackButtonInterceptor = (shouldIntercept, onIntercept) => {
    // Handler for 'popstate' event (back/forward button within the SPA)
    const handlePopState = useCallback((event) => {
        if (shouldIntercept) {
            // Prevent the browser's default back navigation
            event.preventDefault();
            // Run your custom action instead
            onIntercept();
        }
        // If shouldIntercept is false, the browser will proceed normally
    }, [shouldIntercept, onIntercept]);

    // Handler for 'beforeunload' event (closing the tab/window, refreshing, navigating to external site)
    const handleBeforeUnload = useCallback((event) => {
        if (shouldIntercept) {
            // Standard way to trigger the browser's confirmation dialog
            event.preventDefault();
            // Chrome requires returnValue to be set
            event.returnValue = '';
            return ''; // Also return an empty string for legacy support
        }
    }, [shouldIntercept]);

    useEffect(() => {
        if (shouldIntercept) {
            // Add event listeners
            window.addEventListener('popstate', handlePopState);
            window.addEventListener('beforeunload', handleBeforeUnload);
        }

        // Cleanup function: Remove listeners when the component unmounts or dependencies change
        return () => {
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [shouldIntercept, handlePopState, handleBeforeUnload]);
};

export default useBackButtonInterceptor;