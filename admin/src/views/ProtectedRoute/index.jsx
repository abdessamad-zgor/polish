import { Navigate, Route } from 'react-router-dom';
import { connect } from 'react-redux';

function ProtectedRoute(props) {
	const authed = props.idToken !== '' && props.loggedIn;

	return authed ? props.children : <Navigate to="/auth" replace />;
}

const mapStateToProps = (state) => {
	return {
		idToken: state.admin.info.idToken,
		loggedIn: state.admin.info.loggedIn,
	};
};
export default connect(mapStateToProps)(ProtectedRoute);
