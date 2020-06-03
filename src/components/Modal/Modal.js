import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {

	render() {
		// Render nothing if the "show" prop is false
		if(!this.props.show) {
			return null;
		}

	    return (
	      	<div className="backdrop" style={{height: "100vh", width: "100vw", position: "fixed", top: "0", left: "0", zIndex: "99", backgroundColor: 'rgba(0,0,0,0.3)', padding: "130px 50px 50px 50px"}} onClick={this.props.onClose}>
	        	<div style={{backgroundColor: '#fff', borderRadius: "5px", maxWidth: "800px", minHeight: "300px", margin: '0 auto', padding: "5px 30px 30px 30px", zIndex: "100"}} onClick={(e) => {e.stopPropagation()}}>
	        		<div style={{width: "100%", height: "10px"}}>
	        			<span className="addPointer" style={{float: "right"}} onClick={this.props.onClose}>X</span>
	        		</div>
	        		<div className={"font-18"} style={{width: "100%", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "3px solid #d2d2e4"}}>
                        <h4>{this.props.titulo}</h4>
                    </div>
                    <br/>
	          		{this.props.children}
	        	</div>
	      	</div>
	    );
	  }
}

Modal.propTypes = {
  	onClose: PropTypes.func.isRequired,
  	show: PropTypes.bool,
  	children: PropTypes.node
};

export default Modal;