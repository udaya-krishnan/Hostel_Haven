export const removeAuthPersistedState = () => {
    const persistedState = JSON.parse(localStorage.getItem('persist:root'));
    
    if (persistedState) {
        console.log(persistedState, "Persisted data before modification");
        
        // Parse the 'auth' slice since it's a serialized string
        const authState = JSON.parse(persistedState.auth);
        
        if (authState) {
            // Remove 'auth' by simply deleting it
            delete persistedState.auth;
            console.log('Auth removed');
        }
        
        // Save the updated state back to localStorage
        localStorage.setItem('persist:root', JSON.stringify(persistedState));
        console.log('Persisted data after modification:', persistedState);
    }
};
