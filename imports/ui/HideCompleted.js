import React from 'react';

export default ({ toggle, hideCompleted }) => (
  <label className="hide-completed">
    <input
      type="checkbox"
      readOnly
      checked={hideCompleted}
      onClick={toggle}
    />
    Hide Completed Tasks
  </label>
);