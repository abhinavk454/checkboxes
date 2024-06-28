const socket = io();

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("checkbox-container");

  // Generate checkboxes
  for (let i = 0; i < 20; i++) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `checkbox-${i}`;
    checkbox.addEventListener("change", () => {
      socket.emit("checkbox-change", { id: i, checked: checkbox.checked });
    });
    container.appendChild(checkbox);
  }

  // Listen for checkbox state updates
  socket.on("checkbox-update", (data) => {
    const checkbox = document.getElementById(`checkbox-${data.id}`);
    if (checkbox) {
      checkbox.checked = data.checked;
    }
  });

  // Initialize checkbox states
  socket.on("initial-checkbox-states", (states) => {
    states.forEach((checked, i) => {
      const checkbox = document.getElementById(`checkbox-${i}`);
      if (checkbox) {
        checkbox.checked = checked;
      }
    });
  });
});
