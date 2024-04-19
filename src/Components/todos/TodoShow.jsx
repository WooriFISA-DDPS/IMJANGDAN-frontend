import React from "react";

function TodoShow() {
  return (
    <>
      <select
        className="p-2 text-gray-800 bg-gray-200 rounded mr-2"
        data-cy="todo-filter"
      >
        {/* defaultValue? - https://react.dev/reference/react-dom/components/select */}
        <option value="Own" className="text-lg">👤자기 메모</option>
        <option value="Both"  className="text-lg">👥 모두의 메모</option>
      </select>
    </>
  );
}

export default TodoShow;
