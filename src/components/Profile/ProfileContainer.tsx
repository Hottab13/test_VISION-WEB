import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { withAuthRedirectComponents } from "../hoc/withAuthRedirect";
import { compose } from "redux";
import { AppStateType } from "../../redux/ReduxStore";

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {};
type PathParamsType = {
  userId: any | undefined | null;
};
type PropsTypr = MapPropsType &
  DispatchPropsType &
  RouteComponentProps<PathParamsType>;
class ProfileContainer extends React.Component<PropsTypr> {
  refreshProfile() {
    let userId: any | undefined | null = this.props.userId;
    if (!userId) {
      userId = this.props.userId;
    }
  }
  componentDidMount() {
    this.refreshProfile();
  }
  componentDidUpdate(prevProps: PropsTypr) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }
  render() {
    return (
      <Profile {...this.props} isOwner={!this.props.match.params.userId} />
    );
  }
}

let mapStateToProps = (state: AppStateType) => ({
  userId: state.auth.client_id,
});

export default compose<React.ComponentType>(
  connect(mapStateToProps, {}),
  withRouter,
  withAuthRedirectComponents
)(ProfileContainer);
