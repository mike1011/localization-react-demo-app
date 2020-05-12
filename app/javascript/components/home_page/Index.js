import React from "react"
import PropTypes from "prop-types"
import NewUserComponent from "../users/New";

class Index extends React.Component {
  render () {
    return (
      <React.Fragment>
          <div className="new_user">
            <NewUserComponent contentText={this.props.content}/>
          </div>
      </React.Fragment>
    );
  }
}

Index.propTypes = {
  NewUserComponent: PropTypes.node
};
export default Index
