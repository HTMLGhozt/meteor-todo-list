import React from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

// import { Tasks } from '../api/tasks.js'

const _toggleChecked = (id, checked) => {
  Meteor.call('tasks.setChecked', id, !checked);
};

const _deleteTask = id => Meteor.call('tasks.remove', id);

const _togglePrivate = (id, private) => {
  Meteor.call('tasks.setPrivate', id, !private);
};

export default ({ _id, text, checked, username, showPrivate, private }) => {
  const taskClassName = classnames({ checked, private });
  return (
    <li className={taskClassName} >
      <button className="delete" onClick={() => _deleteTask(_id)} >
        &times;
      </button>

      <input
        type="checkbox"
        readOnly
        checked={!!checked}
        onClick={() => _toggleChecked(_id, checked)}
      />

      { showPrivate &&
        <button className="toggle-private" onClick={() => _togglePrivate(_id, private)} >
          { private ? 'Public' : 'Private' }
        </button>
      }

      <span className="text">
        <strong>{username}</strong>: {text}
      </span>
    </li>
  );
}