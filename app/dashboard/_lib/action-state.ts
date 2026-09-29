/** Shared by server actions and the client forms that consume them. */
export type ActionState =
  | { status: "idle" }
  | { status: "success"; message: string; at: number; payload?: Record<string, string> }
  | { status: "error"; message: string; at: number };

export const IDLE: ActionState = { status: "idle" };
export type FormAction = (prev: ActionState, formData: FormData) => Promise<ActionState>;
export type PlainAction = () => Promise<ActionState>;
