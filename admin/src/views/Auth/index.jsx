import React from 'react';
import LoginForm from '../../components/LoginForm';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

function Auth(props) {
	if (props.idToken !== '' && props.loggedIn) {
		return <Navigate to="/" replace />;
	}
	return (
		<div>
			<LoginForm />
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		idToken: state.admin.info.idToken,
		loggedIn: state.admin.info.loggedIn,
	};
};

export default connect(mapStateToProps)(Auth);
