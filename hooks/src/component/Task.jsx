import React, { useReducer, useRef } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, { id: Date.now(), text: action.payload, isVisible: true }];

    case "TOGGLE_TASK":
      return state.map((ele) =>
        ele.id === action.payload ? { ...ele, isVisible: !ele.isVisible } : ele
      );
    case "CLEAR_TASKS":
        return []

    default:
      return state;
  }
};

const Tasklist = () => {
  const input = useRef();
  const [state, dispatch] = useReducer(reducer, []);

  const addTask = (e) => {
    dispatch({ type: "ADD_TASK", payload: e.target.value });
    input.current.value = '';
  };

  const toggleTask = (taskId) => {
    dispatch({ type: "TOGGLE_TASK", payload: taskId });
  };

  const clearTasks = () => {
    dispatch({ type: "CLEAR_TASKS" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // input.current.focus();
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder='Click ENTER'
          ref={input}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask(e);
            }
          }}
        />
        <div className='listDiv'>
          {state.map((ele) => (
            <li key={ele.id} className='lists'>
              {ele.isVisible ? (
                <div className='lists'>
                  {ele.text}
                  <button onClick={() => toggleTask(ele.id)}>Hide</button>
                </div>
              ) : (
                <div className='lists'>
                  The Content is hidden
                  <button onClick={() => toggleTask(ele.id)}>Reveal</button>
                </div>
              )}
            </li>
          ))}
        </div>
      </div>
      <button onClick={clearTasks}>Clear</button>
      <button onClick={scrollToTop}>Scroll to Top</button>
    </>
  );
};

export default Tasklist;
