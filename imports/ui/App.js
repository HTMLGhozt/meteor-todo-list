import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
 
import { Tasks } from '../api/tasks.js';

import HideCompletedToggle from './HideCompleted';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import NewTaskForm from './NewTask';
import Task from './Task';

class App extends React.Component {
  state = {
    hideCompleted: false,
  }

  toggleHideCompleted = () => {
    this.setState(({ hideCompleted }) => ({
      hideCompleted: !hideCompleted,
    }));
  }

  renderTasks = tasks => {
    const { currentUser } = this.props;
    const userId = currentUser && currentUser._id;

    return tasks
      .filter(task => !this.state.hideCompleted || !task.checked)
      .map(task => (
        <Task
          key={task._id}
          {...task}
          showPrivate={task.owner === userId}
        />
      ));
  }

  render = () => (
    <div className="container">
      <header>
        <h1>Todo list</h1>
        <HideCompletedToggle
          toggle={this.toggleHideCompleted}
          hideCompleted={this.state.hideCompleted}
        />
        <AccountsUIWrapper />
        {this.props.currentUser ? <NewTaskForm /> : ''}
      </header>

      <ul>
        {this.renderTasks(this.props.tasks)}
      </ul>
    </div>
  )
}

export default withTracker(() => {
  Meteor.subscribe('tasks');

  return {
    tasks: Tasks.find({}, { createdAt: -1 }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(App);