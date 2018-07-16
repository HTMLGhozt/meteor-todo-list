import React from 'react';
import { Meteor } from 'meteor/meteor';

import { Tasks } from '../api/tasks.js';

const _handleSubmit = (event, node) => {
  event.preventDefault();

  Meteor.call('tasks.insert', node.value);

  node.value = '';
}

export default () => {
  let text;
  return (
    <form className="new-task" onSubmit={e => _handleSubmit(e, text)} >
      <input 
        type="text"
        ref={node => text = node}
        placeholder="add a task..."
      />
    </form>
  );
}