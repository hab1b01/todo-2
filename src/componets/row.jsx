export const Row = ({ item, deleteTask }) => {
  return (
    <li>
      {item.description}
      <button type="button" id="delete-button" onClick={() => deleteTask(item)}>
        Delete
      </button>
    </li>
  );
};
