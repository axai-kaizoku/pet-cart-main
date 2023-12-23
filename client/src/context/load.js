import { useState, useContext, createContext } from 'react';

const LoadContext = createContext();

const LoadProvider = ({ children }) => {
	const [load, setLoad] = useState(false);

	return (
		<LoadContext.Provider value={[load, setLoad]}>
			{children}
		</LoadContext.Provider>
	);
};

// custom hook
const useLoad = () => useContext(LoadContext);

export { useLoad, LoadProvider };
