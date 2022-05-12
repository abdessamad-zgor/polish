import { useNavigate } from 'react-router-dom';

export default function useLogic() {
	const navigate = useNavigate();

	const navigateToPage = (path) => {
		navigate(path);
	};
	return { navigateToPage };
}
