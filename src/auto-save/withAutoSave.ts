import { Editor, Operation, Node } from "slate";
import cloneDeep from "lodash/cloneDeep";
import { createId } from "../utils";

type NodeWithId = Node & { id?: string };

export const withAutoSave = <T extends Editor>(editor: T, timeout = 500) => {
  const e = editor as T & { operationsQueue: Operation[] };
  const { apply } = e;
  e.operationsQueue = [];

  // Override the apply function to capture operations
  e.apply = (op: Operation) => {
    if (op.type === "insert_node") {
      const node = cloneDeep(op.node) as NodeWithId;
      node.id = createId(); // Use nanoid to generate a unique id
      op = { ...op, node };
    } else if (op.type === "insert_text") {
    } else if (op.type === "merge_node") {
    } else if (op.type === "move_node") {
    } else if (op.type === "remove_node") {
    } else if (op.type === "remove_text") {
    } else if (op.type === "set_node") {
    } else if (op.type === "set_selection") {
    } else if (op.type === "split_node") {
      // assign new id for the split_node operation
      const node = cloneDeep(op.properties) as NodeWithId;
      node.id = createId();
      op = { ...op, properties: node };
    }
    e.operationsQueue.push(op);
    console.log("Op", op);

    apply(op);
  };
  return e;
};
