
import React from "react";
import Button from '@material-ui/core/Button';

export default class ButtonComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }
  // Atualizo quando atualiza as props
  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({ data: this.props.data });
    }
  }

  render() {
    return (
      <Button ref={this.props.innerRef}
        title={this.state.data.title}
        key={"doenca-variant" + this.state.data.id}
        variant="outlined"
        color="primary"
        className="button-0"
        style={this.state.data.style}
        onClick={this.state.data.callback(this.state.data.id)}
        children={[
          (this.state.data.isChildren ? <div className="label-fixed" key="0"></div> : '')
        ]}>
      </Button>
    );
  }
}