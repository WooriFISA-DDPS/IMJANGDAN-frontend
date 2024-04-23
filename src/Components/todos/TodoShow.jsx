import React from "react";

function TodoShow() {
  return (
    <div>
      <select
        className="p-2 mr-2 text-gray-800 bg-gray-100 rounded sm:w-30"
        data-cy="todo-filter"
      >
        {/* defaultValue? - https://react.dev/reference/react-dom/components/select */}
        <option value="Both" className="text-lg">
          👥 모두의 메모
        </option>
        <option value="Own" className="text-lg">
          👤개인 메모
        </option>
      </select>
    </div>
  );
}

export default TodoShow;
