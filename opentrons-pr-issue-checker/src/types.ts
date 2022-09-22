export type Response = {
  items: Issue[];
};

export type Issue = {
  id: number;
  repository_url: string;
  number: number;
  state: IssueState;
  title: string;
  body?: string;
  comments: number;
  updated_at: string;
  html_url: string;
  user?: User;
  labels: Label[];
};

export type Label = {
  id: string;
  node_id: string;
  url: string;
  name: string;
  color: string;
}

export type IssueState = "open" | "closed";

export type User = {
  id: number;
  login: string;
  name?: string;
  avatar_url: string;
};
