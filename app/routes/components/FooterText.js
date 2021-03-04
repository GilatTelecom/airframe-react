import React from 'react';
import PropTypes from 'prop-types';

const FooterText = (props) => (
	<React.Fragment>
		(C) { props.year } All Rights Reserved for Gilat Telecom {' '}
		<a
			href="https://www.gilat.net"
			target="_blank"
			rel="noopener noreferrer"
			className="sidebar__link"
		>
			www.gilat.net
		</a>
	</React.Fragment>
)
FooterText.propTypes = {
    year: PropTypes.node,
	name: PropTypes.node,
	desc: PropTypes.node,
};
FooterText.defaultProps = {
    year: "2021"
};

export { FooterText };
