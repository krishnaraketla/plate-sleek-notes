import { useEffect } from "react";
import { Editor, Operation } from "slate";

function useAutoSave(
  editor: Editor & { operationsQueue: Operation[] },
  timeout = 5000
) {
  useEffect(() => {
    let timer: number | undefined;

    // Function to save editor content
    const save = async () => {
      try {
        let ops = editor.operationsQueue;
        console.log("Saving Ops", ops);
        if (ops.length == 0) {
          return;
        }
        let data = JSON.stringify(ops);

        const response = await fetch("http://localhost:3002/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: data,
        });

        if (!response.ok) {
          throw new Error("Save failed");
        }

        // Handle successful save here
      } catch (err) {
        // Handle errors here, could be passed to a parent component or handled locally
        console.error("Auto-save failed:", err);
      }
    };

    // Set up interval to save editor content
    timer = window.setInterval(save, timeout);

    // Clean up interval on unmount
    return () => {
      if (timer) {
        window.clearInterval(timer);
      }
    };
  }, [editor, timeout]);
}

export default useAutoSave;
